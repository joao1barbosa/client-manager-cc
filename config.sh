#!/bin/bash

# Configuração inicial
echo "Configurando ambiente..."

# Instalação das dependências do backend (Laravel) usando Sail
./vendor/bin/sail composer install --no-dev --optimize-autoloader

# Configuração do arquivo .env para produção (exemplo, ajuste conforme necessário)
cp .env.example .env
./vendor/bin/sail php artisan key:generate
./vendor/bin/sail php artisan config:cache

# Migração e seed do banco de dados (se necessário)
./vendor/bin/sail php artisan migrate --force
./vendor/bin/sail php artisan db:seed --force

# Instalação das dependências do frontend (Next.js)
cd frontend
npm install --production

# Compilação dos assets
npm run build

echo "Setup completo."
