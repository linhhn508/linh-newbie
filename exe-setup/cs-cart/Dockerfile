FROM centos:7

RUN yum update -y
RUN yum install nano -y
RUN yum install wget -y


RUN yum -y install epel-release
RUN rpm -Uvh http://rpms.famillecollet.com/enterprise/remi-release-7.rpm
RUN cd /etc/yum.repos.d
RUN wget http://rpms.famillecollet.com/enterprise/remi.repo
RUN yum -y install --enablerepo=remi,remi-php56 php php-common php-devel php-pear php-mbstring php-pdo php-gd

RUN yum -y install php-mbstring
WORKDIR /root/multivendor
COPY ./multivendor /root/multivendor
RUN chmod -R 777 config.local.php images design var
