FROM centos:7

RUN yum update -y \
&& yum install wget -y \
&& yum -y install epel-release \
&& rpm -Uvh http://rpms.famillecollet.com/enterprise/remi-release-7.rpm \
&& cd /etc/yum.repos.d \
&& wget http://rpms.famillecollet.com/enterprise/remi.repo \
&& yum -y install --enablerepo=remi,remi-php72 php php-common php-devel php-pear php-mbstring php-pdo php-gd php-soap php-zip php-mysqli


WORKDIR /root/multivendor
COPY ./multivendor /root/multivendor
RUN chmod -R 777 config.local.php images design var
