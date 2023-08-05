/*
 * Copyright (c) 2016,
 * Karlsruhe Institute of Technology, Institute of Telematics
 *
 * This code is provided under the BSD 2-Clause License.
 * Please refer to the LICENSE.txt file for further information.
 *
 * Author: Michael König
 * Based on: https://github.com/kristrev/inet-diag-example/
 */

// uses /include/uapi/linux/tcp.h --> *UAPI*

#include <Python.h>
#include <stdio.h>
#include <stdbool.h>
#include <stdlib.h>
#include <string.h>
#include <stdint.h>
#include <unistd.h>
#include <asm/types.h>
#include <sys/socket.h>
#include <linux/netlink.h>
#include <linux/rtnetlink.h>
#include <netinet/in.h>
#include <linux/tcp.h>
#include <linux/sock_diag.h>
#include <linux/inet_diag.h>
#include <arpa/inet.h>
#include <pwd.h>


//Kernel TCP states. /include/net/tcp_states.h
enum{
    TCP_ESTABLISHED = 1,
    TCP_SYN_SENT,
    TCP_SYN_RECV,
    TCP_FIN_WAIT1,
    TCP_FIN_WAIT2,
    TCP_TIME_WAIT,
    TCP_CLOSE,
    TCP_CLOSE_WAIT,
    TCP_LAST_ACK,
    TCP_LISTEN,
    TCP_CLOSING
};

enum{
    TCP_CA_OPEN = 0,
    TCP_CA_DISORDER,
    /* TCP_CA_CWR, */
    TCP_CA_RECOVERY,
    TCP_CA_LOSS
} CA_STATES;

/* static const char* tcp_ca_states_map[]={ */
/*     [TCP_CA_OPEN] = "OPEN", */
/*     [TCP_CA_DISORDER] = "DISORDER", */
/*     [TCP_CA_CWR] = "CWR", */
/*     [TCP_CA_RECOVERY] = "RECOVERY", */
/*     [TCP_CA_LOSS] = "LOSS" */
/* }; */

static const char* tcp_states_map[]={
    [TCP_ESTABLISHED] = "ESTABLISHED",
    [TCP_SYN_SENT] = "SYN-SENT",
    [TCP_SYN_RECV] = "SYN-RECV",
    [TCP_FIN_WAIT1] = "FIN-WAIT-1",
    [TCP_FIN_WAIT2] = "FIN-WAIT-2",
    [TCP_TIME_WAIT] = "TIME-WAIT",
    [TCP_CLOSE] = "CLOSE",
    [TCP_CLOSE_WAIT] = "CLOSE-WAIT",
    [TCP_LAST_ACK] = "LAST-ACK",
    [TCP_LISTEN] = "LISTEN",
    [TCP_CLOSING] = "CLOSING"
};

static int nl_sock = 0;

//There are currently 11 states, but the first state is stored in pos. 1.
//Therefore, I need a 12 bit bitmask
#define TCPF_ALL 0xFFF
#define INETDIAG_ALL 0xFFF
#define INETDIAG_NONE 0x000

//Copied from libmnl source
#define SOCKET_BUFFER_SIZE 524288L

//Example of diag_filtering, checks if destination port is <= 1000
//
//The easies way to understand filters, is to look at how the kernel
//processes them. This is done in the function inet_diag_bc_run() in
//inet_diag.c. The yes/no contains offsets to the next condition or aborts
//the loop by making the variable len in inet_diag_bc_run() negative. There
//are some limitations to the yes/no values, see inet_diag_bc_audit();
unsigned char create_filter(void **filter_mem){
    struct inet_diag_bc_op *bc_op = NULL;
    unsigned char filter_len = sizeof(struct inet_diag_bc_op)*2;
    if((*filter_mem = calloc(filter_len, 1)) == NULL)
        return 0;

    bc_op = (struct inet_diag_bc_op*) *filter_mem;
    bc_op->code = INET_DIAG_BC_D_LE;
    bc_op->yes = sizeof(struct inet_diag_bc_op)*2;
    //Only way to stop loop is to make len negative
    bc_op->no = 12;

    //For a port check, the port to check for is stored in the no field of a
    //follow-up bc_op-struct.
    bc_op = bc_op+1;
    bc_op->no = 1000;

    return filter_len;
}

int send_diag_msg(int sockfd, int family){
    struct msghdr msg;
    struct nlmsghdr nlh;
    //To request information about unix sockets, this would be replaced with
    //unix_diag_req, packet-sockets packet_diag_req.
    struct inet_diag_req_v2 conn_req;
    struct sockaddr_nl sa;
    struct iovec iov[4];
    int retval = 0;

    //For the filter
    /* struct rtattr rta; */
    void *filter_mem = NULL;
    /* int filter_len = 0; */

    memset(&msg, 0, sizeof(msg));
    memset(&sa, 0, sizeof(sa));
    memset(&nlh, 0, sizeof(nlh));
    memset(&conn_req, 0, sizeof(conn_req));

    //No need to specify groups or pid. This message only has one receiver and
    //pid 0 is kernel
    sa.nl_family = AF_NETLINK;

    //Address family and protocol we are interested in. sock_diag can also be
    //used with UDP sockets, DCCP sockets and Unix sockets, to mention a few.
    //This example requests information about TCP sockets bound to IPv4
    //addresses.
    conn_req.sdiag_family = family;
    conn_req.sdiag_protocol = IPPROTO_TCP;

    //Filter out some states
    conn_req.idiag_states = TCPF_ALL;
    /* conn_req.idiag_states = TCPF_ALL & */
    /*     ~((1<<TCP_SYN_RECV) | (1<<TCP_TIME_WAIT) | (1<<TCP_CLOSE)); */

    //Request extended TCP information (it is the tcp_info struct)
    //ext is a bitmask containing the extensions I want to acquire. The values
    //are defined in inet_diag.h (the INET_DIAG_*-constants).
    conn_req.idiag_ext = (1 << (INET_DIAG_INFO - 1));

    // TODO: re-enable --> swallows sometimes INET_DIAG_INFO-msg
    // request congestion algo info
    /* conn_req.idiag_ext |= (1 << (INET_DIAG_CONG - 1)); */

    nlh.nlmsg_len = NLMSG_LENGTH(sizeof(conn_req));
    //In order to request a socket bound to a specific IP/port, remove
    //NLM_F_DUMP and specify the required information in conn_req.id
    nlh.nlmsg_flags = NLM_F_DUMP | NLM_F_REQUEST;

    //Example of how to only match some sockets
    //In order to match a single socket, I have to provide all fields
    //sport/dport, saddr/daddr (look at dump_on_icsk)
    //conn_req.id.idiag_dport=htons(443);

    //Avoid using compat by specifying family + protocol in header
    nlh.nlmsg_type = SOCK_DIAG_BY_FAMILY;
    iov[0].iov_base = (void*) &nlh;
    iov[0].iov_len = sizeof(nlh);
    iov[1].iov_base = (void*) &conn_req;
    iov[1].iov_len = sizeof(conn_req);


    //Set message correctly
    msg.msg_name = (void*) &sa;
    msg.msg_namelen = sizeof(sa);
    msg.msg_iov = iov;
    if(filter_mem == NULL)
        msg.msg_iovlen = 2;
    else
        msg.msg_iovlen = 4;

    retval = sendmsg(sockfd, &msg, 0);

    if(filter_mem != NULL)
        free(filter_mem);

    return retval;
}

#define TCPI_HAS_OPT(info, opt) !!(info->tcpi_options & (opt))


static inline const char *rta_getattr_str(const struct rtattr *rta){
    return (const char *)RTA_DATA(rta);
}


int parse_rtattr_flags(struct rtattr *tb[], int max, struct rtattr *rta, int len, unsigned short flags)
{
    unsigned short type;

    memset(tb, 0, sizeof(struct rtattr *) * (max + 1));
    while (RTA_OK(rta, len)) {
        type = rta->rta_type & ~flags;
        if ((type <= max) && (!tb[type]))
            tb[type] = rta;
        rta = RTA_NEXT(rta,len);
    }
    if (len)
        fprintf(stderr, "!!!Deficit %d, rta_len=%d\n", len, rta->rta_len);
    return 0;
}

int parse_rtattr(struct rtattr *tb[], int max, struct rtattr *rta, int len)
{
    return parse_rtattr_flags(tb, max, rta, len, 0);
}

void parse_diag_msg(struct inet_diag_msg *diag_msg, int rtalen, PyObject *flowList){
    struct rtattr *attr;
    struct tcp_info *tcpi;
    char local_addr_buf[INET6_ADDRSTRLEN];
    char remote_addr_buf[INET6_ADDRSTRLEN];
    struct passwd *uid_info = NULL;

    memset(local_addr_buf, 0, sizeof(local_addr_buf));
    memset(remote_addr_buf, 0, sizeof(remote_addr_buf));

    /* (Try to) Get user info */
    uid_info = getpwuid(diag_msg->idiag_uid);

    if(diag_msg->idiag_family == AF_INET){
        inet_ntop(AF_INET, (struct in_addr*) &(diag_msg->id.idiag_src),
                local_addr_buf, INET_ADDRSTRLEN);
        inet_ntop(AF_INET, (struct in_addr*) &(diag_msg->id.idiag_dst),
                remote_addr_buf, INET_ADDRSTRLEN);
    } else if(diag_msg->idiag_family == AF_INET6){
        inet_ntop(AF_INET6, (struct in_addr6*) &(diag_msg->id.idiag_src),
                local_addr_buf, INET6_ADDRSTRLEN);
        inet_ntop(AF_INET6, (struct in_addr6*) &(diag_msg->id.idiag_dst),
                remote_addr_buf, INET6_ADDRSTRLEN);
    } else {
        fprintf(stderr, "Unknown family\n");
        return;
    }

    if(local_addr_buf[0] == 0 || remote_addr_buf[0] == 0){
        fprintf(stderr, "Could not get required connection information\n");
        return;
    }

    PyObject *dictObj = PyDict_New();
    //Parse the attributes of the netlink message in search of the
    //INET_DIAG_INFO-attribute
    if(rtalen > 0){
        attr = (struct rtattr*) (diag_msg+1);

        int i = 0;
        while(RTA_OK(attr, rtalen)){
            PyObject *o;
            if(attr->rta_type == INET_DIAG_CONG){
                // TODO: re-enable
                /* char congestionAlgoName[16]; */
                /* strncpy(congestionAlgoName, */
                /*         rta_getattr_str(attr), */
                /*         sizeof(congestionAlgoName) - 1); */
                /* o = PyUnicode_FromString(congestionAlgoName); */
                /* PyDict_SetItemString(dictObj, "congestionAlgo", o); */
                /* Py_DECREF(o); */
            }else if(attr->rta_type == INET_DIAG_INFO){
                //The payload of this attribute is a tcp_info-struct, so it is
                //ok to cast
                tcpi = (struct tcp_info*) RTA_DATA(attr);

                if(tcpi->tcpi_state){
                    o = PyUnicode_FromString(tcp_states_map[tcpi->tcpi_state]);
                    PyDict_SetItemString(dictObj, "state", o);
                    Py_DECREF(o);
                }

                /* if(tcpi->tcpi_ca_state > 0){ */
                /*     o = PyUnicode_FromString(tcp_ca_states_map[tcpi->tcpi_ca_state]); */
                /*     PyDict_SetItemString(dictObj, "ca_state", o); */
                /*     Py_DECREF(o); */
                /* } */

                o = PyUnicode_FromString(local_addr_buf);
                PyDict_SetItemString(dictObj, "srcIp", o);
                Py_DECREF(o);

                o = PyLong_FromLong(ntohs(diag_msg->id.idiag_sport));
                PyDict_SetItemString(dictObj, "srcPort", o);
                Py_DECREF(o);

                o = PyUnicode_FromString(remote_addr_buf);
                PyDict_SetItemString(dictObj, "dstIp", o);
                Py_DECREF(o);

                o = PyLong_FromLong(ntohs(diag_msg->id.idiag_dport));
                PyDict_SetItemString(dictObj, "dstPort", o);
                Py_DECREF(o);

                o = PyLong_FromUnsignedLong(tcpi->tcpi_snd_cwnd);
                PyDict_SetItemString(dictObj, "cwnd", o);
                Py_DECREF(o);

                o = PyLong_FromUnsignedLongLong(tcpi->tcpi_bytes_acked);
                PyDict_SetItemString(dictObj, "bytes_acked", o);
                Py_DECREF(o);

                o = PyLong_FromUnsignedLong(tcpi->tcpi_snd_ssthresh);
                PyDict_SetItemString(dictObj, "snd_ssthresh", o);
                Py_DECREF(o);

                o = PyLong_FromUnsignedLong(tcpi->tcpi_rtt);
                PyDict_SetItemString(dictObj, "rtt", o);
                Py_DECREF(o);

                o = PyLong_FromUnsignedLong(tcpi->tcpi_lost);
                PyDict_SetItemString(dictObj, "lost", o);
                Py_DECREF(o);

                o = PyLong_FromUnsignedLong(tcpi->tcpi_retransmits);
                PyDict_SetItemString(dictObj, "retransmits", o);
                Py_DECREF(o);

                o = PyLong_FromUnsignedLong(tcpi->tcpi_probes);
                PyDict_SetItemString(dictObj, "probes", o);
                Py_DECREF(o);

                o = PyLong_FromUnsignedLong(tcpi->tcpi_backoff);
                PyDict_SetItemString(dictObj, "backoff", o);
                Py_DECREF(o);

                o = PyLong_FromUnsignedLong(tcpi->tcpi_lost);
                PyDict_SetItemString(dictObj, "lost", o);
                Py_DECREF(o);

                o = PyLong_FromUnsignedLong(tcpi->tcpi_snd_wscale);
                PyDict_SetItemString(dictObj, "snd_wscale", o);
                Py_DECREF(o);

                o = PyLong_FromUnsignedLong(tcpi->tcpi_rcv_wscale);
                PyDict_SetItemString(dictObj, "rcv_wscale", o);
                Py_DECREF(o);

                o = PyLong_FromUnsignedLong(tcpi->tcpi_rto);
                PyDict_SetItemString(dictObj, "rto", o);
                Py_DECREF(o);

                o = PyLong_FromUnsignedLong(tcpi->tcpi_ato);
                PyDict_SetItemString(dictObj, "ato", o);
                Py_DECREF(o);

                o = PyLong_FromUnsignedLong(tcpi->tcpi_snd_mss);
                PyDict_SetItemString(dictObj, "snd_mss", o);
                Py_DECREF(o);

                o = PyLong_FromUnsignedLong(tcpi->tcpi_rcv_mss);
                PyDict_SetItemString(dictObj, "rcv_mss", o);
                Py_DECREF(o);

                o = PyLong_FromUnsignedLong(tcpi->tcpi_unacked);
                PyDict_SetItemString(dictObj, "unacked", o);
                Py_DECREF(o);

                o = PyLong_FromUnsignedLong(tcpi->tcpi_sacked);
                PyDict_SetItemString(dictObj, "sacked", o);
                Py_DECREF(o);

                o = PyLong_FromUnsignedLong(tcpi->tcpi_retrans);
                PyDict_SetItemString(dictObj, "retrans", o);
                Py_DECREF(o);

                o = PyLong_FromUnsignedLong(tcpi->tcpi_fackets);
                PyDict_SetItemString(dictObj, "fackets", o);
                Py_DECREF(o);

                o = PyLong_FromUnsignedLong(tcpi->tcpi_last_data_sent);
                PyDict_SetItemString(dictObj, "last_data_sent", o);
                Py_DECREF(o);

                o = PyLong_FromUnsignedLong(tcpi->tcpi_last_ack_sent);
                PyDict_SetItemString(dictObj, "last_ack_sent", o);
                Py_DECREF(o);

                o = PyLong_FromUnsignedLong(tcpi->tcpi_last_data_recv);
                PyDict_SetItemString(dictObj, "last_data_recv", o);
                Py_DECREF(o);

                o = PyLong_FromUnsignedLong(tcpi->tcpi_last_ack_recv);
                PyDict_SetItemString(dictObj, "last_ack_recv", o);
                Py_DECREF(o);

                o = PyLong_FromUnsignedLong(tcpi->tcpi_pmtu);
                PyDict_SetItemString(dictObj, "pmtu", o);
                Py_DECREF(o);

                o = PyLong_FromUnsignedLong(tcpi->tcpi_rcv_ssthresh);
                PyDict_SetItemString(dictObj, "rcv_ssthresh", o);
                Py_DECREF(o);

                o = PyLong_FromUnsignedLong(tcpi->tcpi_rttvar);
                PyDict_SetItemString(dictObj, "rttvar", o);
                Py_DECREF(o);

                o = PyLong_FromUnsignedLong(tcpi->tcpi_advmss);
                PyDict_SetItemString(dictObj, "advmss", o);
                Py_DECREF(o);

                o = PyLong_FromUnsignedLong(tcpi->tcpi_reordering);
                PyDict_SetItemString(dictObj, "reordering", o);
                Py_DECREF(o);

                o = PyLong_FromUnsignedLong(tcpi->tcpi_rcv_rtt);
                PyDict_SetItemString(dictObj, "rcv_rtt", o);
                Py_DECREF(o);

                o = PyLong_FromUnsignedLong(tcpi->tcpi_rcv_space);
                PyDict_SetItemString(dictObj, "rcv_space", o);
                Py_DECREF(o);

                o = PyLong_FromUnsignedLong(tcpi->tcpi_total_retrans);
                PyDict_SetItemString(dictObj, "total_retrans", o);
                Py_DECREF(o);

                o = PyLong_FromUnsignedLongLong(tcpi->tcpi_pacing_rate);
                PyDict_SetItemString(dictObj, "pacing_rate", o);
                Py_DECREF(o);

                o = PyLong_FromUnsignedLongLong(tcpi->tcpi_max_pacing_rate);
                PyDict_SetItemString(dictObj, "max_pacing_rate", o);
                Py_DECREF(o);

                o = PyLong_FromUnsignedLongLong(tcpi->tcpi_bytes_received);
                PyDict_SetItemString(dictObj, "bytes_received", o);
                Py_DECREF(o);

                o = PyLong_FromUnsignedLongLong(tcpi->tcpi_segs_out);
                PyDict_SetItemString(dictObj, "segs_out", o);
                Py_DECREF(o);

                o = PyLong_FromUnsignedLongLong(tcpi->tcpi_segs_in);
                PyDict_SetItemString(dictObj, "segs_in", o);
                Py_DECREF(o);

                o = PyUnicode_FromString(uid_info == NULL ? "unknown" : uid_info->pw_name);
                PyDict_SetItemString(dictObj, "user", o);
                Py_DECREF(o);

                o = PyLong_FromUnsignedLong(diag_msg->idiag_uid);
                PyDict_SetItemString(dictObj, "uid", o);
                Py_DECREF(o);

                o = PyLong_FromUnsignedLong(diag_msg->idiag_inode);
                PyDict_SetItemString(dictObj, "inode", o);
                Py_DECREF(o);

                bool has_ts_opt = TCPI_HAS_OPT(tcpi, TCPI_OPT_TIMESTAMPS);
                bool has_sack_opt = TCPI_HAS_OPT(tcpi, TCPI_OPT_SACK);
                bool has_ecn_opt = TCPI_HAS_OPT(tcpi, TCPI_OPT_ECN);
                bool has_ecnseen_opt = TCPI_HAS_OPT(tcpi, TCPI_OPT_ECN_SEEN);
                bool has_fastopen_opt = TCPI_HAS_OPT(tcpi, TCPI_OPT_SYN_DATA);

                PyObject *options = PyList_New(0);
                if(has_ts_opt){
                    o = PyUnicode_FromString("ts");
                    PyList_Append(options, o);
                    Py_DECREF(o);
                }
                if(has_sack_opt){
                    o = PyUnicode_FromString("sack");
                    PyList_Append(options, o);
                    Py_DECREF(o);
                }
                if(has_ecn_opt){
                    o = PyUnicode_FromString("ecn");
                    PyList_Append(options, o);
                    Py_DECREF(o);
                }
                if(has_ecnseen_opt){
                    o = PyUnicode_FromString("ecnseen");
                    PyList_Append(options, o);
                    Py_DECREF(o);
                }
                if(has_fastopen_opt){
                    o = PyUnicode_FromString("fastopen");
                    PyList_Append(options, o);
                    Py_DECREF(o);
                }

                PyDict_SetItemString(dictObj, "options", options);
                Py_DECREF(options);

                PyList_Append(flowList, dictObj);
                Py_DECREF(dictObj);
            }
            attr = RTA_NEXT(attr, rtalen);
            i++;
        }
    }
}

int getTcpInfoListHelper(int family, PyObject *flowList){
    int numbytes = 0, rtalen = 0;
    struct nlmsghdr *nlh;
    uint8_t recv_buf[SOCKET_BUFFER_SIZE];
    struct inet_diag_msg *diag_msg;

    //Send the request for the sockets we are interested in
    if(send_diag_msg(nl_sock, family) < 0){
        perror("could not send request");
        return -1;
    }

    numbytes = recv(nl_sock, recv_buf, sizeof(recv_buf), 0);
    nlh = (struct nlmsghdr*) recv_buf;

    //The requests can (will in most cases) come as multiple netlink messages. I
    //need to receive all of them. Assumes no packet loss, so if the last packet
    //(the packet with NLMSG_DONE) is lost, the application will hang.

    while(NLMSG_OK(nlh, numbytes)){
        if(nlh->nlmsg_type == NLMSG_DONE)
            return EXIT_SUCCESS;

        if(nlh->nlmsg_type == NLMSG_ERROR){
            /* fprintf(stderr, "Error in netlink message\n"); */
            /* perror("foo"); */
            return -1;
        }

        diag_msg = (struct inet_diag_msg*) NLMSG_DATA(nlh);
        rtalen = nlh->nlmsg_len - NLMSG_LENGTH(sizeof(*diag_msg));

        parse_diag_msg(diag_msg, rtalen, flowList);

        nlh = NLMSG_NEXT(nlh, numbytes);
    }
    return EXIT_SUCCESS;
}


static PyObject* startUp(PyObject *self, PyObject *args){
    //Create the monitoring socket
    if((nl_sock = socket(AF_NETLINK, SOCK_DGRAM, NETLINK_INET_DIAG)) == -1){
        perror("could not create monitoring-socket");
        return NULL;
    }
    Py_RETURN_NONE;
}

static PyObject* tearDown(PyObject *self, PyObject *args){
    //Create the monitoring socket
    if(close(nl_sock) == -1){
        perror("could not close monitoring-socket");
        return NULL;
    }
    Py_RETURN_NONE;
}

static PyObject* getTcpInfoList(PyObject *self, PyObject *args){
    PyObject *lst = PyList_New(0);

    if(getTcpInfoListHelper(AF_INET, lst) == -1
            || (getTcpInfoListHelper(AF_INET6, lst) == -1)){
        tearDown(self, args);
        startUp(self, args);
    }

    if(!lst){
        Py_RETURN_NONE;
    }

    return lst;
}

static PyObject* getListOfAvailableValues(PyObject *self, PyObject *args){
    PyObject *lst = PyList_New(0);

    PyObject *o;

    // TODO: re-enable
    /* o = PyUnicode_FromString("congestionAlgo"); */
    /* PyList_Append(lst, o); */
    /* Py_DECREF(o); */
    o = PyUnicode_FromString("state");
    PyList_Append(lst, o);
    Py_DECREF(o);
    o = PyUnicode_FromString("ca_state");
    PyList_Append(lst, o);
    Py_DECREF(o);
    o = PyUnicode_FromString("srcIp");
    PyList_Append(lst, o);
    Py_DECREF(o);
    o = PyUnicode_FromString("srcPort");
    PyList_Append(lst, o);
    Py_DECREF(o);
    o = PyUnicode_FromString("dstIp");
    PyList_Append(lst, o);
    Py_DECREF(o);
    o = PyUnicode_FromString("dstPort");
    PyList_Append(lst, o);
    Py_DECREF(o);
    o = PyUnicode_FromString("cwnd");
    PyList_Append(lst, o);
    Py_DECREF(o);
    o = PyUnicode_FromString("bytes_acked");
    PyList_Append(lst, o);
    Py_DECREF(o);
    o = PyUnicode_FromString("snd_ssthresh");
    PyList_Append(lst, o);
    Py_DECREF(o);
    o = PyUnicode_FromString("rtt");
    PyList_Append(lst, o);
    Py_DECREF(o);
    o = PyUnicode_FromString("retransmits");
    PyList_Append(lst, o);
    Py_DECREF(o);
    o = PyUnicode_FromString("probes");
    PyList_Append(lst, o);
    Py_DECREF(o);
    o = PyUnicode_FromString("backoff");
    PyList_Append(lst, o);
    Py_DECREF(o);
    o = PyUnicode_FromString("lost");
    PyList_Append(lst, o);
    Py_DECREF(o);
    o = PyUnicode_FromString("snd_wscale");
    PyList_Append(lst, o);
    Py_DECREF(o);
    o = PyUnicode_FromString("rcv_wscale");
    PyList_Append(lst, o);
    Py_DECREF(o);
    o = PyUnicode_FromString("rto");
    PyList_Append(lst, o);
    Py_DECREF(o);
    o = PyUnicode_FromString("ato");
    PyList_Append(lst, o);
    Py_DECREF(o);
    o = PyUnicode_FromString("snd_mss");
    PyList_Append(lst, o);
    Py_DECREF(o);
    o = PyUnicode_FromString("rcv_mss");
    PyList_Append(lst, o);
    Py_DECREF(o);
    o = PyUnicode_FromString("unacked");
    PyList_Append(lst, o);
    Py_DECREF(o);
    o = PyUnicode_FromString("sacked");
    PyList_Append(lst, o);
    Py_DECREF(o);
    o = PyUnicode_FromString("retrans");
    PyList_Append(lst, o);
    Py_DECREF(o);
    o = PyUnicode_FromString("fackets");
    PyList_Append(lst, o);
    Py_DECREF(o);
    o = PyUnicode_FromString("last_data_sent");
    PyList_Append(lst, o);
    Py_DECREF(o);
    o = PyUnicode_FromString("last_ack_sent");
    PyList_Append(lst, o);
    Py_DECREF(o);
    o = PyUnicode_FromString("last_data_recv");
    PyList_Append(lst, o);
    Py_DECREF(o);
    o = PyUnicode_FromString("last_ack_recv");
    PyList_Append(lst, o);
    Py_DECREF(o);
    o = PyUnicode_FromString("pmtu");
    PyList_Append(lst, o);
    Py_DECREF(o);
    o = PyUnicode_FromString("rcv_ssthresh");
    PyList_Append(lst, o);
    Py_DECREF(o);
    o = PyUnicode_FromString("rttvar");
    PyList_Append(lst, o);
    Py_DECREF(o);
    o = PyUnicode_FromString("advmss");
    PyList_Append(lst, o);
    Py_DECREF(o);
    o = PyUnicode_FromString("reordering");
    PyList_Append(lst, o);
    Py_DECREF(o);
    o = PyUnicode_FromString("rcv_rtt");
    PyList_Append(lst, o);
    Py_DECREF(o);
    o = PyUnicode_FromString("rcv_space");
    PyList_Append(lst, o);
    Py_DECREF(o);
    o = PyUnicode_FromString("total_retrans");
    PyList_Append(lst, o);
    Py_DECREF(o);
    o = PyUnicode_FromString("pacing_rate");
    PyList_Append(lst, o);
    Py_DECREF(o);
    o = PyUnicode_FromString("max_pacing_rate");
    PyList_Append(lst, o);
    Py_DECREF(o);
    o = PyUnicode_FromString("bytes_received");
    PyList_Append(lst, o);
    Py_DECREF(o);
    o = PyUnicode_FromString("segs_out");
    PyList_Append(lst, o);
    Py_DECREF(o);
    o = PyUnicode_FromString("segs_in");
    PyList_Append(lst, o);
    Py_DECREF(o);
    o = PyUnicode_FromString("user");
    PyList_Append(lst, o);
    Py_DECREF(o);
    o = PyUnicode_FromString("uid");
    PyList_Append(lst, o);
    Py_DECREF(o);
    o = PyUnicode_FromString("inode");
    PyList_Append(lst, o);
    Py_DECREF(o);
    o = PyUnicode_FromString("options");
    PyList_Append(lst, o);
    Py_DECREF(o);

    if(!lst){
        Py_RETURN_NONE;
    }
    Py_INCREF(lst);
    return lst;
}


static PyMethodDef tcpinfo_methods[] = {
    {
        "getTcpInfoList",
        getTcpInfoList,
        METH_NOARGS,
        "Returns list with information about all current TCP-flows (per socket)"
    },
    {
        "getListOfAvailableValues",
        getListOfAvailableValues,
        METH_NOARGS,
        "Returns list with all available values."
    },
    {
        "startUp",
        startUp,
        METH_NOARGS,
        "Initializes com-sockets"
    },
    {
        "tearDown",
        tearDown,
        METH_NOARGS,
        "Clean up (closes com-socket)"
    },
    {NULL, NULL, 0, NULL}
};

static struct PyModuleDef tcpinfo_definition = {
    PyModuleDef_HEAD_INIT,
    "tcpinfo",
    "Collects stats about TCP sockets via inet_diag",
    -1,
    tcpinfo_methods
};


PyMODINIT_FUNC PyInit_tcpinfo(void)
{
    Py_Initialize();

    return PyModule_Create(&tcpinfo_definition);
}
