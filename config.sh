#!/bin/bash

# Configuração inicial
echo "Configurando ambiente..."

cd backend

cp .env.example .env

php artisan key:generate

cd ..

cp .env.example .env

docker compose up --build -d

alias laravel="docker compose exec backend"

laravel php artisan migrate

laravel php artisan db:seed

echo "----------------------------------------------------------------"
echo "Tudo online digite CTRL+C Para finalizar a execução do frontend"
echo "Digite o comando 'cd ../backend' depois './vendor/bin/sail down' para parar o backend"