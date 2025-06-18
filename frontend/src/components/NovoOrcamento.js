import React, { useState, useEffect } from 'react';
import api from '../config/axios';
import { Plus, Trash2, Save, User, FileText } from 'lucide-react';

const NovoOrcamento = () => {
  const [produtos, setProdutos] = useState([]);
  const [formData, setFormData] = useState({
    cliente: '',
    observacoes: ''
  });
  const [itens, setItens] = useState([]);
  const [alert, setAlert] = useState({ show: false, message: '', type: '' });

  useEffect(() => {
    fetchProdutos();
  }, []);

  const fetchProdutos = async () => {
    try {
      const response = await api.get('/api/produtos');
      setProdutos(response.data);
    } catch (error) {
      showAlert('Erro ao carregar produtos', 'danger');
    }
  };

  const showAlert = (message, type) => {
    setAlert({ show: true, message, type });
    setTimeout(() => setAlert({ show: false, message: '', type: '' }), 3000);
  };

  const addItem = () => {
    if (produtos.length === 0) {
      showAlert('Cadastre produtos primeiro antes de criar um orçamento', 'danger');
      return;
    }

    const newItem = {
      id: Date.now(),
      produtoId: '',
      nome: '',
      quantidade: 1,
      preco: 0,
      subtotal: 0
    };

    setItens([...itens, newItem]);
  };

  const removeItem = (index) => {
    const newItens = itens.filter((_, i) => i !== index);
    setItens(newItens);
  };

  const updateItem = (index, field, value) => {
    const newItens = [...itens];
    newItens[index] = { ...newItens[index], [field]: value };

    // Se o produto foi selecionado, atualizar nome e preço
    if (field === 'produtoId') {
      const produto = produtos.find(p => p.id === value);
      if (produto) {
        newItens[index].nome = produto.nome;
        newItens[index].preco = produto.preco;
        newItens[index].subtotal = produto.preco * newItens[index].quantidade;
      }
    }

    // Se a quantidade foi alterada, recalcular subtotal
    if (field === 'quantidade') {
      newItens[index].quantidade = parseInt(value) || 0;
      newItens[index].subtotal = newItens[index].preco * newItens[index].quantidade;
    }

    setItens(newItens);
  };

  const calculateTotal = () => {
    return itens.reduce((sum, item) => sum + item.subtotal, 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.cliente.trim()) {
      showAlert('Nome do cliente é obrigatório', 'danger');
      return;
    }

    if (itens.length === 0) {
      showAlert('Adicione pelo menos um item ao orçamento', 'danger');
      return;
    }

    // Validar se todos os itens têm produto selecionado
    const invalidItems = itens.filter(item => !item.produtoId);
    if (invalidItems.length > 0) {
      showAlert('Todos os itens devem ter um produto selecionado', 'danger');
      return;
    }

    try {
      const orcamentoData = {
        cliente: formData.cliente,
        observacoes: formData.observacoes,
        itens: itens.map(item => ({
          produtoId: item.produtoId,
          nome: item.nome,
          quantidade: item.quantidade,
          preco: item.preco
        }))
      };

      await api.post('/api/orcamentos', orcamentoData);
      showAlert('Orçamento criado com sucesso!', 'success');
      
      // Limpar formulário
      setFormData({ cliente: '', observacoes: '' });
      setItens([]);
    } catch (error) {
      showAlert('Erro ao criar orçamento', 'danger');
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1>Novo Orçamento</h1>
      </div>

      {alert.show && (
        <div className={`alert alert-${alert.type}`}>
          {alert.message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="card mb-4">
          <h2 style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <User size={20} />
            Informações do Cliente
          </h2>
          
          <div className="form-group">
            <label htmlFor="cliente">Nome do Cliente *</label>
            <input
              type="text"
              id="cliente"
              className="form-control"
              value={formData.cliente}
              onChange={(e) => setFormData({ ...formData, cliente: e.target.value })}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="observacoes">Observações</label>
            <textarea
              id="observacoes"
              className="form-control"
              value={formData.observacoes}
              onChange={(e) => setFormData({ ...formData, observacoes: e.target.value })}
              rows="3"
              placeholder="Observações adicionais sobre o orçamento..."
            />
          </div>
        </div>

        <div className="card mb-4">
          <div className="flex justify-between items-center mb-4">
            <h2 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FileText size={20} />
              Itens do Orçamento
            </h2>
            <button
              type="button"
              className="btn btn-primary"
              onClick={addItem}
            >
              <Plus size={16} />
              Adicionar Item
            </button>
          </div>

          {itens.length === 0 && (
            <div className="text-center" style={{ padding: '40px', color: '#666' }}>
              <FileText size={48} style={{ color: '#ccc', marginBottom: '16px' }} />
              <p>Nenhum item adicionado ainda.</p>
              <p>Clique em "Adicionar Item" para começar.</p>
            </div>
          )}

          {itens.map((item, index) => (
            <div key={item.id} className="item-row">
              <select
                className="form-control"
                value={item.produtoId}
                onChange={(e) => updateItem(index, 'produtoId', e.target.value)}
                required
              >
                <option value="">Selecione um produto</option>
                {produtos.map((produto) => (
                  <option key={produto.id} value={produto.id}>
                    {produto.nome} - {formatCurrency(produto.preco)}
                  </option>
                ))}
              </select>
              
              <input
                type="number"
                className="form-control"
                placeholder="Qtd"
                value={item.quantidade}
                onChange={(e) => updateItem(index, 'quantidade', e.target.value)}
                min="1"
                style={{ width: '80px' }}
                required
              />
              
              <input
                type="text"
                className="form-control"
                value={formatCurrency(item.preco)}
                readOnly
                style={{ width: '120px' }}
              />
              
              <input
                type="text"
                className="form-control"
                value={formatCurrency(item.subtotal)}
                readOnly
                style={{ width: '120px' }}
              />
              
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => removeItem(index)}
                style={{ padding: '8px 12px' }}
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}

          {itens.length > 0 && (
            <div className="total-section">
              <h3>Total: {formatCurrency(calculateTotal())}</h3>
            </div>
          )}
        </div>

        <div className="text-right">
          <button type="submit" className="btn btn-success" disabled={itens.length === 0}>
            <Save size={16} />
            Criar Orçamento
          </button>
        </div>
      </form>
    </div>
  );
};

export default NovoOrcamento; 