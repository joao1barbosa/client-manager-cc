#!/bin/bash

# Configuração inicial
echo "Configurando ambiente..."

# Navegar para o diretório backend e configurar o .env
cd backend || exit
cp .env.example .env

# Instala dependências do laravel e do sail
composer require laravel/sail --dev

php artisan key:generate

# Voltar para o diretório raiz
cd ..

# Configurar o .env na raiz se necessário
cp .env.example .env

# Construir e iniciar os containers Docker
docker compose up --build -d

# Aguardar um pouco para garantir que os containers estejam prontos
echo "Aguardando os containers iniciarem completamente..."
sleep 15

# Verificar se o container backend está em execução
if [ "$(docker compose ps -q backend)" ]; then
  # Executar migrations e seeders
  docker compose exec backend php artisan migrate
  docker compose exec backend php artisan db:seed
else
  echo "Container backend não está em execução."
fi

echo "----------------------------------------------------------------"
echo "Tudo online | Digite 'docker compose down' para fechar as aplicações"
