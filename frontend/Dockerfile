# Use a versão oficial do Node.js 18.17
FROM node:18.17-alpine AS base
WORKDIR /app

# Instale as dependências apenas quando necessário
FROM base AS deps
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Recompile o código-fonte apenas quando necessário
FROM base AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN yarn build

# Imagem de produção, copie todos os arquivos e execute o Next.js
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

# Você só precisa copiar next.config.js se não estiver usando a configuração padrão
# COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000

CMD ["yarn", "start"]
