FROM centos/systemd
WORKDIR /root

RUN yum update -y \
&& yum install epel-release yum-utils -y \
&& yum install http://rpms.remirepo.net/enterprise/remi-release-7.rpm -y \
&& yum-config-manager --enable remi-php73 \
&& yum install php php-common php-opcache php-mcrypt php-cli php-gd php-curl php-mysqlnd \
php-pdo php-soap php-zip php-mysqli php-mysql php-mail php-fpm -y\
&& yum install nginx -y

COPY ./multivendor /root/multivendor
