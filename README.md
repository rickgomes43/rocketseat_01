# Rocketseat | Desafio 01

Desafio realizado conforme conforme proposto:
[Link do desafio](https://github.com/Rocketseat/bootcamp-gostack-desafio-01/blob/master/README.md#desafio-01-conceitos-do-nodejs)

## Iniciar

Instalar pacotes (Express e Nodemon) que estão presentes no package.json

```js
yarn install
```

Iniciar a aplicação com nodemon. Está definido no package.json o inicio `dev`.

```js
yarn dev
```

## Rotas

- `GET /projects`: Listar todos os projetos.
- `POST /projects`: Deve ser enviado dentro do corpo da rota como no exemplo:
  `{ "id": "1", "title": "Novo Projeto", "tasks": [] }`.
- `PUT /projects/:id`: Deve ser passado o número do ID do projeto na URL e no corpo o nome a ser alterado `{ name: "Novo Nome" }`.
- `DEL /projects/:id`: Deletar projeto existente. Deve ser passado o número do ID do projeto na URL.
- `POST /:id/projects`: Para adicionar tarefas ao seu projeto deve ser enviado o número do ID na URL e no corpo o nome da tarefa:
  `{ "title": "Novo da Tarefa" }`.

## Middlewares

Foram criados 2 middlewares para controle da aplicação.

### 1 ) Middleware Local | Validação se o projeto existe

Utilizando para validar se o ID do projeto enviado existe ou não.

```js
// Definindo variavél para projetos
const projects = [];

// Middleware Local - Número de Requisições
function checkProjectExists(req, res, next) {
  const { id } = req.params;
  const project = projects.find(p => p.id == id);

  if (!project) {
    return res.status(400).json({ error: "Projeto não encontrado" });
  }
  return next();
}
```

### 2 ) Middleware Global | Controle do total de requisições

Utilizando para acompanhar o total de requisições solicitadas.

```js
// Definindo variável para o número de requisições
let numberOfRequests = 0;

// Middleware Local - Número de Requisições
function logRequests(req, res, next) {
  numberOfRequests++;
  console.log(`Total de requisições: ${numberOfRequests}`);
  return next();
}

// Adicionando o Middleware de requisições em formato Global
server.use(logRequests);
```
