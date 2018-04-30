:house: :ear:

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
