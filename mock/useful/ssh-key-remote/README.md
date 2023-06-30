## Windows

> create keys
```
  ssh-keygen -t rsa -b 4096 -f ~./.ssh/auth_rsa
```
> copy public key into sever
```
  scp ~/.ssh/auth_rsa.pub user@ip:~/key.pub
```
> connected to server
```
  ssh user@ip
```
> move key into correct folder for you
```
  cat ~/key.pub >> ~/.ssh/authorized_keys
  rm -rf ~/key.pub
```
> and connect with secret key
```
  ssh user@ip -i ~/.ssh/auth_rsa
```


## Linux
```
  ssh-keygen -t rsa -b 4096 -f ~./.ssh/auth_rsa
  ssh-copy-id -i ~/.ssh/auth_rsa.pub user@ip
  ssh user@ip
```
