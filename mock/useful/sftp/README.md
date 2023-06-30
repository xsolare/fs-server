## Ubuntu

> pre install
```
  sudo apt update
  sudo apt install vsftpd
  sudo systemctl status vsftpd
  sudo systemctl enable vsftpd
```
> copy original for backup
```
  sudo cp /etc/vsftpd.conf /etc/vsftpd.conf.original
```
> setting vsftpd.conf
```
  sudo nano /etc/vsftpd.conf

  listen=YES
  listen_ipv6=NO
  anonymous_enable=NO
  local_enable=YES
  write_enable=YES
  local_umask=022
  dirmessage_enable=YES
  use_localtime=YES
  xferlog_enable=YES
  connect_from_port_20=YES

  xferlog_file=/var/log/vsftpd.log
  xferlog_std_format=YES

  chroot_local_user=YES
  allow_writeable_chroot=YES

  pam_service_name=vsftpd

  userlist_enable=YES
  userlist_file=/etc/vsftpd.userlist
  userlist_deny=NO

  rsa_cert_file=/etc/ssl/private/vsftpd.pem
  rsa_private_key_file=/etc/ssl/private/vsftpd.pem
  ssl_enable=YES
```
> create ssh key
```
  sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/ssl/private/vsftpd.pem -out /etc/ssl/private/vsftpd.pem

  sudo systemctl restart vsftpd
```

> create ssh key
```
  sudo nano /etc/vsftpd.userlist
  #  or
  echo "injurka" | sudo tee -a /etc/vsftpd.userlist
```

> setup ports
```
  sudo ufw allow 20/tcp
  sudo ufw allow 21/tcp
  sudo ufw allow OpenSSH
  sudo ufw allow 990/tcp
  sudo ufw allow 40000:50000/tcp

  sudo ufw disable
  sudo ufw enable

  sudo ufw status
```



