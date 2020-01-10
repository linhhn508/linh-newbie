FOLOW https://docs.cs-cart.com/latest/install/nginx.html

fix not found php-fpm.sock: https://stackoverflow.com/questions/40059745/nginx-connect-to-unix-var-run-php7-0-fpm-sock-failed-2-no-such-file-or-dir

thay đổi /etc/php.ini:
+ ;cgi.fix_pathinfo=1 -> cgi.fix_pathinfo=0

thay đổi /etc/php-fpm.d/www.conf:
+ listen = 127.0.0.1:9000
+ user = nginx
+ group = nginx
+ listen.owner = nobody
+ listen.group = nobody


systemctl restart php-fpm

cp nginx.conf

docker run --privileged --name con-php7.3-nginx -v /sys/fs/cgroup:/sys/fs/cgroup:ro -p 8000:80 -d im-php7.3-nginx


https://www.digitalocean.com/community/tutorials/how-to-install-linux-nginx-mysql-php-lemp-stack-on-centos-7
https://docs.cs-cart.com/latest/install/nginx.html
https://www.php.net/manual/en/install.unix.nginx.php
https://linuxize.com/post/install-php-7-on-centos-7/
