PACKAGE := tcpinfo

.DEFAULT_GOAL := install
.PHONY := install global-install clean

uninstall:
	pip3 uninstall tcpinfo

global-install:
	sudo pip3 install .

install:
	pip3 install --user .

reinstall: uninstall install

clean:
	rm -rf build usr
