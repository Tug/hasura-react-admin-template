#!/bin/bash

export $(cat .env.production | sed 's/#.*//g' | xargs) && sudo -E docker-compose -f docker-compose.yaml -f docker-compose.production.yaml up -d
