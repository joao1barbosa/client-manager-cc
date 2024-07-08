# client-manager-cc

Este projeto consiste na solução de um desafio técnico, que se trata de um crud de clientes com cartões de crédito

## 📷 Demonstrações

## 🎲 Estrutura do Banco de Dados

## 📱 Technologias

- **React**
- **Next.js**
- **TypeScript**
- **Tailwind**
- **Laravel**
- **MySQL**

## 🔧 Instalação

## 🌐 Variáveis Ambiente

Para fins de praticidade e, visto que é um projeto que não irá para produção, optei por deixar as variáveis ambiente padrões.
Logo, a única configuração necessária é mudar o nome do arquivo **.env.example** para **.env**.

## 🏗 Setup

## 🏃 Run

## 📋 Endpoints
  
### Client Endpoints:
- **GET /clients:** Lista todos os Clientes.
- **POST /clients:** Cria registro para um novo Cliente.
- **GET /clients/{uuid}:** Retorna um Cliente expecífico baseado no uuid passado como parâmetro.
- **PUT /clients/{uuid}:** Edita um Cliente expecífico baseado no uuid.
- **DELETE /clients/{uuid}:** Deleta um Cliente expecífico baseado no uuid.

### Cards Endpoints
- **POST /clients:** Cria registro para um novo Cartão e conecta ele a um Cliente.
- **GET /clients/{uuid}:** Retorna uma lista de Cartões vinculados ao uuid passado como parâmetro.
- **DELETE /clients/{numero}:** Deleta um cartão que possuí o numero passado com parâmetro.

### Addresses Endpoints
- **POST /clients:**: Cria registro para um Endereço e conecta ele a um Cliente.
- **GET /clients/{uuid}:** Retorna o Endereço vinculado ao uuid passado como parâmetro.
- **PUT /clients/{uuid}:** Edita o Endereço expecífico baseado no uuid.
