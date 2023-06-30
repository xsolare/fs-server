# Arch / Manjaro

```bash
fonts

sudo pacman -S adobe-source-han-sans-cn-fonts
```

```bash
sudo pacman -S fcitx fcitx-im kcm-fcitx fcitx-configtool

> 1
```

```bash
sudo nano ~/.pam_environment

GTK_IM_MODULE=fcitx
QT_IM_MODULE=fcitx
XMODIFIERS=@im=fcitx

> LogOut
```

```bash
yay -S fcitx-sogoupinyin
```

```bash
sudo pacman -S fcitx-googlepinyin
```
