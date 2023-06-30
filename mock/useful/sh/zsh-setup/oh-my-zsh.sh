#!/bin/bash

# pacman -S zsh curl        # Arch
apt-get install zsh curl      # Ubuntu

chsh -s zsh
chsh -s /bin/zsh ${USER}

sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"

ZSH_PATH="~/.oh-my-zsh/custom"

git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_PATH:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
git clone https://github.com/zsh-users/zsh-completions ${ZSH_PATH:-~/.oh-my-zsh/custom}/plugins/zsh-completions
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_PATH:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
git clone https://github.com/zsh-users/zsh-history-substring-search ${ZSH_PATH:-~/.oh-my-zsh/custom}/plugins/zsh-history-substring-search

cp .zshrc ~/.zshrc
