FROM centos/systemd

RUN yum update -y \
&& yum install epel-release yum-utils -y \
&& yum install http://rpms.remirepo.net/enterprise/remi-release-7.rpm -y \
&& yum-config-manager --enable remi-php73 \
&& yum install php php-common php-devel php-pear php-opcache php-mcrypt \
php-cli php-gd php-curl php-mysqlnd \
php-mbstring php-pdo php-soap php-zip php-mysqli php-mysql php-mail php-fpm -y \
php-xml php-libxml php-SimpleXML php-dom php-xmlreader php-xmlwriter \
&& yum install nginx -y

COPY ./multivendor /var/www/html/example.com
WORKDIR /var/www/html/example.com

RUN chmod 666 config.local.php \
&& chmod -R 777 design images var

COPY ./setup/ /root/setup
RUN cp -f /root/setup/nginx1.conf /etc/nginx/nginx.conf \
&& cp -f /root/setup/php1.ini /etc/php.ini \
&& cp -f /root/setup/www1.conf /etc/php-fpm.d/www.conf
