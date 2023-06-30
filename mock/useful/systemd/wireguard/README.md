## WireGuard

> create script
```bash
    sudo nano /opt/wg-quick-setup.sh

    sudo chown 777 /opt/wg-quick-setup.sh
    sudo chmod +rwx /opt/wg-quick-setup.sh
```
> content in /opt/wg-quick-setup.sh
```sh
    #!/bin/sh

    wg-quick up wg0
```
> create systemd service
```bash
  sudo nano /etc/systemd/system/wg-quick-setup.service
```
> content in /opt/wg-quick-setup.sh
```sh
    [Unit]
    Description=WireGuard auto setup
    Wants=network-online.target
    After=network-online.target

    [Service]
    Type=oneshot
    ExecStart=/opt/wg-quick-setup.sh
    RemainAfterExit=true
    # ExecStop=/opt/wg-quick-down.sh
    StandardOutput=journal

    [Install]
    WantedBy=multi-user.target
```
> test service
```bash
    systemctl start wg-quick-setup.service
    systemctl enable wg-quick-setup.service
```
