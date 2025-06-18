const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Armazenamento em memória (em produção, usar banco de dados)
let produtos = [];
let orcamentos = [];

// Rotas para Produtos
app.get('/api/produtos', (req, res) => {
  res.json(produtos);
});

app.post('/api/produtos', (req, res) => {
  const { nome, preco, descricao } = req.body;
  
  if (!nome || !preco) {
    return res.status(400).json({ error: 'Nome e preço são obrigatórios' });
  }

  const produto = {
    id: uuidv4(),
    nome,
    preco: parseFloat(preco),
    descricao: descricao || '',
    dataCriacao: new Date().toISOString()
  };

  produtos.push(produto);
  res.status(201).json(produto);
});

app.put('/api/produtos/:id', (req, res) => {
  const { id } = req.params;
  const { nome, preco, descricao } = req.body;

  const index = produtos.findIndex(p => p.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Produto não encontrado' });
  }

  produtos[index] = {
    ...produtos[index],
    nome: nome || produtos[index].nome,
    preco: preco ? parseFloat(preco) : produtos[index].preco,
    descricao: descricao !== undefined ? descricao : produtos[index].descricao
  };

  res.json(produtos[index]);
});

app.delete('/api/produtos/:id', (req, res) => {
  const { id } = req.params;
  
  const index = produtos.findIndex(p => p.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Produto não encontrado' });
  }

  produtos.splice(index, 1);
  res.status(204).send();
});

// Rotas para Orçamentos
app.get('/api/orcamentos', (req, res) => {
  res.json(orcamentos);
});

app.post('/api/orcamentos', (req, res) => {
  const { cliente, itens, observacoes } = req.body;

  if (!cliente || !itens || itens.length === 0) {
    return res.status(400).json({ error: 'Cliente e itens são obrigatórios' });
  }

  const orcamento = {
    id: uuidv4(),
    cliente,
    itens: itens.map(item => ({
      ...item,
      id: uuidv4(),
      subtotal: item.quantidade * item.preco
    })),
    observacoes: observacoes || '',
    dataCriacao: new Date().toISOString(),
    total: itens.reduce((sum, item) => sum + (item.quantidade * item.preco), 0)
  };

  orcamentos.push(orcamento);
  res.status(201).json(orcamento);
});

app.get('/api/orcamentos/:id', (req, res) => {
  const { id } = req.params;
  const orcamento = orcamentos.find(o => o.id === id);
  
  if (!orcamento) {
    return res.status(404).json({ error: 'Orçamento não encontrado' });
  }

  res.json(orcamento);
});

app.delete('/api/orcamentos/:id', (req, res) => {
  const { id } = req.params;
  
  const index = orcamentos.findIndex(o => o.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Orçamento não encontrado' });
  }

  orcamentos.splice(index, 1);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
}); 