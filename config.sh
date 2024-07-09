#!/bin/bash

# Configuração inicial
echo "Configurando ambiente..."

cd backend

cp .env.example .env

composer require laravel/sail --dev

./vendor/bin/sail up -d

./vendor/bin/sail php artisan migrate

