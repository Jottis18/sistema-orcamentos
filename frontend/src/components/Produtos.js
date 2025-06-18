import React, { useState, useEffect } from 'react';
import api from '../config/axios';
import { Plus, Edit, Trash2, X, Save } from 'lucide-react';

const Produtos = () => {
  const [produtos, setProdutos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingProduto, setEditingProduto] = useState(null);
  const [formData, setFormData] = useState({
    nome: '',
    preco: '',
    descricao: ''
  });
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (editingProduto) {
        await api.put(`/api/produtos/${editingProduto.id}`, formData);
        showAlert('Produto atualizado com sucesso!', 'success');
      } else {
        await api.post('/api/produtos', formData);
        showAlert('Produto cadastrado com sucesso!', 'success');
      }
      
      setShowModal(false);
      setEditingProduto(null);
      setFormData({ nome: '', preco: '', descricao: '' });
      fetchProdutos();
    } catch (error) {
      showAlert('Erro ao salvar produto', 'danger');
    }
  };

  const handleEdit = (produto) => {
    setEditingProduto(produto);
    setFormData({
      nome: produto.nome,
      preco: produto.preco.toString(),
      descricao: produto.descricao
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este produto?')) {
      try {
        await api.delete(`/api/produtos/${id}`);
        showAlert('Produto excluído com sucesso!', 'success');
        fetchProdutos();
      } catch (error) {
        showAlert('Erro ao excluir produto', 'danger');
      }
    }
  };

  const openModal = () => {
    setEditingProduto(null);
    setFormData({ nome: '', preco: '', descricao: '' });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingProduto(null);
    setFormData({ nome: '', preco: '', descricao: '' });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1>Gerenciar Produtos</h1>
        <button className="btn btn-primary" onClick={openModal}>
          <Plus size={16} />
          Novo Produto
        </button>
      </div>

      {alert.show && (
        <div className={`alert alert-${alert.type}`}>
          {alert.message}
        </div>
      )}

      <div className="card">
        <table className="table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Preço</th>
              <th>Descrição</th>
              <th>Data de Criação</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {produtos.map((produto) => (
              <tr key={produto.id}>
                <td>{produto.nome}</td>
                <td>R$ {produto.preco.toFixed(2)}</td>
                <td>{produto.descricao}</td>
                <td>{new Date(produto.dataCriacao).toLocaleDateString('pt-BR')}</td>
                <td>
                  <div className="flex gap-2">
                    <button
                      className="btn btn-primary"
                      onClick={() => handleEdit(produto)}
                      style={{ padding: '5px 10px', fontSize: '12px' }}
                    >
                      <Edit size={14} />
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(produto.id)}
                      style={{ padding: '5px 10px', fontSize: '12px' }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {produtos.length === 0 && (
          <div className="text-center" style={{ padding: '40px' }}>
            <p>Nenhum produto cadastrado ainda.</p>
            <button className="btn btn-primary mt-4" onClick={openModal}>
              Cadastrar Primeiro Produto
            </button>
          </div>
        )}
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title">
                {editingProduto ? 'Editar Produto' : 'Novo Produto'}
              </h2>
              <button className="close" onClick={closeModal}>
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="nome">Nome *</label>
                <input
                  type="text"
                  id="nome"
                  className="form-control"
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="preco">Preço *</label>
                <input
                  type="number"
                  id="preco"
                  className="form-control"
                  value={formData.preco}
                  onChange={(e) => setFormData({ ...formData, preco: e.target.value })}
                  step="0.01"
                  min="0"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="descricao">Descrição</label>
                <textarea
                  id="descricao"
                  className="form-control"
                  value={formData.descricao}
                  onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                  rows="3"
                />
              </div>
              
              <div className="flex gap-2 justify-between">
                <button type="button" className="btn" onClick={closeModal}>
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary">
                  <Save size={16} />
                  {editingProduto ? 'Atualizar' : 'Cadastrar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Produtos; 