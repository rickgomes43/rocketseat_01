// Declarando o Express
const express = require("express");
const server = express();

// Definindo Json para o Express
server.use(express.json());

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

// Listar Todos os Projetos
server.get("/projects", (req, res) => {
  return res.json(projects);
});

// Adicionar um novo Projeto
server.post("/projects", (req, res) => {
  const { id, title } = req.body;
  const project = {
    id,
    title,
    tasks: []
  };
  projects.push(project);
  return res.json(project);
});

// Alterar nome de um Projeto
server.put("/projects/:id", checkProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const project = projects.find(p => p.id === id);
  project.title = title;
  return res.json(project);
});

// Deletar um projeto
server.delete("/projects/:id", checkProjectExists, (req, res) => {
  const { id } = req.params;
  const project = projects.findIndex(p => p.id === id);
  projects.splice(project, 1);
  return res.send();
});

// Adicionar Tarefas a um Projeto
server.post("/projects/:id/tasks", checkProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const project = projects.find(p => p.id === id);
  project.tasks.push(title);
  return res.json(project);
});

// Declarando a porta
server.listen(3000);
