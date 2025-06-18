# Sistema de Orçamentos

Uma aplicação completa para gerenciar produtos e criar orçamentos para clientes, desenvolvida com React (frontend) e Node.js/Express (backend).

## Funcionalidades

### 🛍️ Gerenciamento de Produtos
- Cadastrar novos produtos com nome, preço e descrição
- Editar produtos existentes
- Excluir produtos
- Visualizar lista completa de produtos

### 📋 Criação de Orçamentos
- Criar orçamentos para clientes
- Adicionar múltiplos itens ao orçamento
- Selecionar produtos da lista cadastrada
- Definir quantidade para cada item
- Cálculo automático de subtotais e total
- Adicionar observações ao orçamento

### 📊 Visualização de Orçamentos
- Listar todos os orçamentos criados
- Visualizar detalhes completos de cada orçamento
- Excluir orçamentos
- Formatação de valores em moeda brasileira

## Tecnologias Utilizadas

### Backend
- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **CORS** - Middleware para requisições cross-origin
- **UUID** - Geração de IDs únicos
- **Body Parser** - Parsing de requisições JSON

### Frontend
- **React** - Biblioteca JavaScript para interfaces
- **React Router** - Roteamento da aplicação
- **Axios** - Cliente HTTP para requisições
- **Lucide React** - Ícones modernos
- **CSS3** - Estilização responsiva

## Instalação e Configuração

### Pré-requisitos
- Node.js (versão 14 ou superior)
- npm ou yarn

### Passo a Passo

1. **Clone o repositório**
   ```bash
   git clone <url-do-repositorio>
   cd fazedororcamento
   ```

2. **Instale as dependências do Backend**
   ```bash
   cd backend
   npm install
   ```

3. **Instale as dependências do Frontend**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Configure as variáveis de ambiente (opcional)**
   
   No arquivo `backend/server.js`, você pode alterar a porta padrão:
   ```javascript
   const PORT = process.env.PORT || 5000;
   ```

## Como Executar

### Desenvolvimento

1. **Inicie o servidor backend**
   ```bash
   cd backend
   npm run dev
   ```
   O servidor estará rodando em `http://localhost:5000`

2. **Inicie o servidor frontend** (em outro terminal)
   ```bash
   cd frontend
   npm start
   ```
   A aplicação estará disponível em `http://localhost:3000`

### Produção

1. **Build do frontend**
   ```bash
   cd frontend
   npm run build
   ```

2. **Inicie o servidor backend**
   ```bash
   cd backend
   npm start
   ```

## Como Usar

### 1. Cadastrar Produtos
1. Acesse a seção "Produtos" no menu
2. Clique em "Novo Produto"
3. Preencha:
   - **Nome**: Nome do produto
   - **Preço**: Valor unitário
   - **Descrição**: Descrição opcional
4. Clique em "Cadastrar"

### 2. Criar um Orçamento
1. Acesse "Novo Orçamento" no menu
2. Preencha as informações do cliente:
   - **Nome do Cliente**: Nome obrigatório
   - **Observações**: Texto opcional
3. Adicione itens:
   - Clique em "Adicionar Item"
   - Selecione um produto da lista
   - Defina a quantidade
   - O preço e subtotal são calculados automaticamente
4. Repita o processo para adicionar mais itens
5. Clique em "Criar Orçamento"

### 3. Visualizar Orçamentos
1. Acesse "Orçamentos" no menu
2. Veja a lista de todos os orçamentos criados
3. Clique no ícone de olho para ver detalhes completos
4. Use o ícone de lixeira para excluir orçamentos

## Estrutura do Projeto

```
fazedororcamento/
├── backend/
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Produtos.js
│   │   │   ├── Orcamentos.js
│   │   │   └── NovoOrcamento.js
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   └── index.css
│   └── package.json
└── README.md
```

## API Endpoints

### Produtos
- `GET /api/produtos` - Listar todos os produtos
- `POST /api/produtos` - Criar novo produto
- `PUT /api/produtos/:id` - Atualizar produto
- `DELETE /api/produtos/:id` - Excluir produto

### Orçamentos
- `GET /api/orcamentos` - Listar todos os orçamentos
- `POST /api/orcamentos` - Criar novo orçamento
- `GET /api/orcamentos/:id` - Obter detalhes do orçamento
- `DELETE /api/orcamentos/:id` - Excluir orçamento

## Características Técnicas

- **Interface Responsiva**: Funciona em desktop, tablet e mobile
- **Validação de Dados**: Validação client-side e server-side
- **Feedback Visual**: Alertas e mensagens de sucesso/erro
- **Cálculos Automáticos**: Subtotal e total calculados em tempo real
- **Armazenamento em Memória**: Dados persistidos durante a sessão (para produção, recomenda-se banco de dados)

## Próximas Melhorias

- [ ] Persistência de dados com banco de dados
- [ ] Autenticação de usuários
- [ ] Exportação de orçamentos em PDF
- [ ] Histórico de alterações
- [ ] Categorização de produtos
- [ ] Relatórios e estatísticas
- [ ] Backup automático dos dados

## Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## Suporte

Se você encontrar algum problema ou tiver dúvidas, abra uma issue no repositório do projeto. 