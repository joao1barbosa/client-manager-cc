#!/bin/bash

# Configuração inicial
echo "Configurando ambiente..."

cd backend

cp .env.example .env

composer require laravel/sail --dev

./vendor/bin/sail up -d

./vendor/bin/sail php artisan migrate

#Configurando frontend
cd ../frontend

yarn install
yarn build
yarn start

# ----------------------------------------------------------------
# Tudo online digite CTRL+C Para finalizar a execução do frontend
# Digite o comando 'cd ../backend' depois './vendor/bin/sail down' para parar o backend
