<p align="center">
  <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" />
</p>

<h1 align="center">API de Autenticação - NestJS</h1>

<p align="center">
  Uma API genérica de autenticação desenvolvida com <a href="http://nestjs.com/" target="_blank">NestJS</a>, 
  projetada para ser base de autenticação em diferentes aplicações.
</p>

---

## 📖 Descrição

Este projeto é uma **API de autenticação** construída em [NestJS](https://nestjs.com), usando **TypeScript** e pronta para servir como base em qualquer aplicação que precise de:

- Registro de usuários
- Autenticação via JWT
- Documentação Swagger
- Segurança e boas práticas de backend

---

## 🧰 Stacks & Principais Dependências

- **NestJS** — framework Node.js para aplicações escaláveis.
- **Prisma** — ORM moderno com tipagem forte.
- **SQLite** — banco de dados leve (arquivo local `dev.db`).
- **JWT (jsonwebtoken)** — autenticação com tokens.
- **bcrypt** — hash de senhas.
- **class-validator / class-transformer** — validação de DTOs.
- **Swagger** — documentação automática da API.

> Obs.: você pode trocar o SQLite por Postgres/MySQL depois sem alterar sua camada de domínio; basta ajustar o `DATABASE_URL` e regenerar o Prisma.

---

## 🚀 Instalação e Configuração

Clone o repositório:

```bash
git clone https://github.com/Lcamargodasilva/generic-api-auth.git
cd seu-repositorio
```

Instale as dependências:

```bash
npm install
```

Crie um arquivo **.env** na raiz do projeto:

### Exemplo (.env com SQLite)

```env
# Prisma / Banco de dados
DATABASE_URL="file:./dev.db"  # SQLite local

# Autenticação
SECRET_KEY="sua_chave_secreta_super_segura"
```

> Se usar Postgres:
> `DATABASE_URL="postgresql://usuario:senha@localhost:5432/minha_base?schema=public"`

---

## 🗄️ Banco de Dados (Prisma + SQLite)

### 1) Inicializar Prisma (caso ainda não exista)

```bash
npx prisma init
```

Isso cria `prisma/schema.prisma` e adiciona `DATABASE_URL` ao `.env`.

### 2) Gerar Client do Prisma

```bash
npx prisma generate
```

### 3) Criar/Migrar o banco (desenvolvimento)

Crie sua primeira migration com base no `schema.prisma`:

```bash
npx prisma migrate dev --name init
```

> Sempre que alterar o schema, rode novamente `migrate dev` para versionar suas mudanças em `prisma/migrations`.

### 4) Popular o banco

```bash
npx prisma db seed
```

### 5) Inspecionar dados com Prisma Studio

```bash
npx prisma studio
```

#### Comandos úteis do Prisma

```bash
# Empurrar o schema sem migration (útil em protótipos)
npx prisma db push

# Resetar o banco (apaga tudo e reaplica migrations)
npx prisma migrate reset

# Ver estado das migrations
npx prisma migrate status
```

> **Dica:** em produção use `npx prisma migrate deploy` durante o deploy (aplica migrations já criadas).

---

## ▶️ Como rodar o projeto

### Ambiente de desenvolvimento

```bash
npm run start:dev
```

### Ambiente de produção

```bash
npm run build
npm run start:prod
```

---

## 🧪 Testes

Rodar todos os testes unitários:

```bash
npm run test
```

Rodar testes e2e:

```bash
npm run test:e2e
```

Gerar relatório de cobertura:

```bash
npm run test:cov
```

---

## 🔐 Autenticação (resumo)

- **Login** com e-mail/usuário + senha
- **Hash** de senha com `bcrypt` (`salt` configurável via `BCRYPT_SALT`)
- **JWT** assinado com `JWT_SECRET` e expiração `JWT_EXPIRES_IN`
- **Guards** e **Decorators** para proteger rotas e extrair usuário autenticado

> Recomenda-se usar `class-validator` nos DTOs de `login`/`register` e aplicar guards globalmente quando fizer sentido.

---

## 📚 Recursos úteis

- [Documentação oficial do NestJS](https://docs.nestjs.com)
- [JWT Documentation](https://jwt.io/introduction)
- [Prisma](https://www.prisma.io/)
- [class-validator](https://github.com/typestack/class-validator)
- [Swagger para NestJS](https://docs.nestjs.com/openapi/introduction)

---

## 🚨 Configuração do .gitignore

Neste projeto, o arquivo `.env` foi **REMOVIDO** do `.gitignore`.
Se você for utilizar este repositório em uma aplicação real, atente-se a esse detalhe para evitar o vazamento de informações sensíveis do sistema.

```bash
# .env  // Não ignorar o .env por padrão neste projeto
```

⚠️ **Boa prática:** em ambientes reais (produção, homologação, etc.), **nunca versione o arquivo `.env`**.
Mantenha-o fora do repositório e use variáveis de ambiente nativas do provedor (Docker, Vercel, Heroku, AWS, etc.).

---
