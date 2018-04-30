# :house: :ear:

* Add your user on `gpio` group

```shell
sudo adduser <your user> gpio
```

* Add permission to the library access the GPIO

```shell
cat >/etc/udev/rules.d/20-gpiomem.rules <<EOF
SUBSYSTEM=="bcm2835-gpiomem", KERNEL=="gpiomem", GROUP="gpio", MODE="0660"
EOF
```

### Systemd

* Copy `systemd/housear.service` to `/etc/systemd/system/housear.service`
* Run `sudo systemctl enable housear.service` to enable the service
* Run `sudo systemctl start housear.service` to start the service
* Run `sudo systemctl status housear.service` to check the service status
