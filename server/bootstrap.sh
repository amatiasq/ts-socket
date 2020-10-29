#!/bin/bash

pm2 start \
  --cwd $(pwd) \
  --name ts-socket \
  --interpreter $(which ts-node) \
  src/index.ts
