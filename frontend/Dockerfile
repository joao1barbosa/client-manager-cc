# Stage 1: Build
FROM node:18-alpine AS builder

# Defina o diretório de trabalho
WORKDIR /app

# Copie os arquivos de configuração
COPY package.json yarn.lock ./

# Instale as dependências
RUN yarn install

# Copie o restante dos arquivos
COPY . .

# Construa o projeto
RUN yarn build

# Stage 2: Production
FROM node:18-alpine

# Defina o diretório de trabalho
WORKDIR /app

# Copie apenas os arquivos necessários da build
COPY --from=builder /app ./

# Exponha a porta
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["yarn", "start"]