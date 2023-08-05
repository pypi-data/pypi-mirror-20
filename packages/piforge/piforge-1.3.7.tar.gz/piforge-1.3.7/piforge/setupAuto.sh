#! /bin/sh

buildFile() {
if [ -e /etc/init.d/piforgeStart ]; then
	sudo rm /etc/init.d/piforgeStart
fi

sudo cat <<EOF >/etc/init.d/piforgeStart
#! /bin/sh
#/etc/init.d/piforgeStart
### BEGIN INIT INFO
# Provides: piforgeStart
# Required-Start: \$remote_fs \$syslog
# Required-Stop: \$remote_fs \$syslog
# Default-Start: 2 3 4 5
# Default-Stop: 0 1 6
# Short-Description: start a program from boot
# Description: A simple script  which will start a program from boot and stop upon shut-down
### END INIT INFO
# Put any commands you always want to run here.
sudo piforge
EOF
return
}


echo "*******WARNING*****"
echo "piforge is designed to be installed on Raspberry Pi devices"
echo "in a classroom environment. This will install a webserver on your device"
echo "that will accept and execute python code sent to it anonymously."
echo "this will be very convenient in a classroom lab environment but presents"
echo "some obvious security issues on a production system."
echo "Having the program launch at startup is convenient, but don't forget that it's running."
echo "*******END WARNING*****"
echo ""
echo "Do you want piforge to load automatically at startup [y|n]"
read answer


if [ "$answer" = "y" ] ; then
	echo "configuring piforge startup"
	buildFile
	sudo chmod +x /etc/init.d/piforgeStart
	sudo update-rc.d piforgeStart defaults
	sudo piforge

else
	if [ -e /etc/init.d/piforgeStart ]; then
		echo "removing startup file"
		sudo update-rc.d piforgeStart remove
		sudo rm /etc/init.d/piforgeStart
	fi
	echo "piforge will NOT load automatically"
fi
echo "launch piforge servery by typing: piforge"
