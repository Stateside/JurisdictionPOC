#!/bin/bash

if ! command -v nvm &> /dev/null
then 
  echo "Installing NVM"
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.2/install.sh | bash
else
  echo "NVM is already installed"
fi

echo "Installing Node LTS 16"
. ~/.nvm/nvm.sh
nvm install 16.19.0
nvm use 16.19.0

echo "Installing global required packages"
npm install -g yarn pm2
