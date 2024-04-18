# Stocksys

Stocksys é uma aplicação de controle e gerenciamento de ativos de estoque voltada para empreendimentos do setor varejista, desenvolvida para obtenção do título de Especialista em Engenharia de Software na PUC Minas.

## Estrutura do Repositório

O repositório está estruturado na forma de um monorepo contendo os seguintes projetos:

- Core (Api Node.js)
- Web-app (Cliente Web React)

## Instalação

Após clonar o repositório, siga os passos a seguir para roda a aplicação localmente:

### Instalação das dependências

Na raíz do projeto, instale todas as dependências necessárias

```bash
npm install
```
ou
```bash
yarn
```

### Core

Como pré-requisito, é necessário criar um arquivo .env na raíz dentro do projeto apps/core com a seguinte estrutura:

```bash
PORT= #Porta de conexão da api

DATABASE_URL= #String de conexão com banco de dados PostgreSQL

SECRET= #Hash gerado para assinatura dos tokens JWT gerados
```

Depois de setado o arquivo .env basta rodar o comando para criar o client do PrismaORM:

```bash
npx prisma generate
```

Então, inicie o projeto:

```bash
npm run dev
```
ou
```bash
yarn dev
```

### Web App

Para rodar a aplicação web, execute o comando abaixo dentro da pasta apps/web-app

```bash
npm run dev
```
ou
```bash
yarn dev
```

## Tecnologias Utilizadas

- [Node.js](https://github.com/nodejs/node)
- [Typescript](https://github.com/microsoft/TypeScript)
- [ExpressJs](https://github.com/expressjs/express)
- [PrismaORM](https://github.com/prisma/prisma)
- [Tsyringe](https://github.com/microsoft/tsyringe)
- [React](https://github.com/facebook/react)
- [Vite](https://github.com/vitejs/vite)
- [Tailwind](https://github.com/tailwindlabs/tailwindcss)
- [Zod](https://github.com/colinhacks/zod)
- [React Router Dom](https://github.com/remix-run/react-router)
- [React Hook Form](https://github.com/react-hook-form/react-hook-form)
- [Shadcn/ui](https://github.com/shadcn-ui/ui)
- [Lucide Icons](https://github.com/lucide-icons/lucide)

## Autor

Feito com ❤️ por Marcelo Kern 👋🏻