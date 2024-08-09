# Use a imagem base do Node.js
FROM node:18-alpine

# Defina o diretório de trabalho
WORKDIR /app

# Copie os arquivos de configuração
COPY package.json yarn.lock ./

# Instale as dependências
RUN yarn install

# Copie o restante dos arquivos
COPY . .

# # Construa o projeto
# RUN yarn build

# Exponha a porta
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["yarn", "dev"]
