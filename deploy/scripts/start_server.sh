#!/bin/bash
. ~/.nvm/nvm.sh
pm2 start /opt/jurisdictions/deploy/ecosystem.json
pm2 startup
pm2 save
