import React, { useState, useEffect } from 'react';
import api from '../config/axios';
import { Trash2, Eye, FileText } from 'lucide-react';

const Orcamentos = () => {
  const [orcamentos, setOrcamentos] = useState([]);
  const [selectedOrcamento, setSelectedOrcamento] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: '', type: '' });

  useEffect(() => {
    fetchOrcamentos();
  }, []);

  const fetchOrcamentos = async () => {
    try {
      const response = await api.get('/api/orcamentos');
      setOrcamentos(response.data);
    } catch (error) {
      showAlert('Erro ao carregar orçamentos', 'danger');
    }
  };

  const showAlert = (message, type) => {
    setAlert({ show: true, message, type });
    setTimeout(() => setAlert({ show: false, message: '', type: '' }), 3000);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este orçamento?')) {
      try {
        await api.delete(`/api/orcamentos/${id}`);
        showAlert('Orçamento excluído com sucesso!', 'success');
        fetchOrcamentos();
      } catch (error) {
        showAlert('Erro ao excluir orçamento', 'danger');
      }
    }
  };

  const handleView = async (id) => {
    try {
      const response = await api.get(`/api/orcamentos/${id}`);
      setSelectedOrcamento(response.data);
      setShowModal(true);
    } catch (error) {
      showAlert('Erro ao carregar detalhes do orçamento', 'danger');
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedOrcamento(null);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1>Orçamentos</h1>
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
              <th>Cliente</th>
              <th>Total</th>
              <th>Itens</th>
              <th>Data de Criação</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {orcamentos.map((orcamento) => (
              <tr key={orcamento.id}>
                <td>{orcamento.cliente}</td>
                <td>{formatCurrency(orcamento.total)}</td>
                <td>{orcamento.itens.length} item(s)</td>
                <td>{formatDate(orcamento.dataCriacao)}</td>
                <td>
                  <div className="flex gap-2">
                    <button
                      className="btn btn-primary"
                      onClick={() => handleView(orcamento.id)}
                      style={{ padding: '5px 10px', fontSize: '12px' }}
                    >
                      <Eye size={14} />
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(orcamento.id)}
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
        
        {orcamentos.length === 0 && (
          <div className="text-center" style={{ padding: '40px' }}>
            <FileText size={48} style={{ color: '#ccc', marginBottom: '16px' }} />
            <p>Nenhum orçamento criado ainda.</p>
            <p style={{ color: '#666', fontSize: '14px' }}>
              Crie seu primeiro orçamento na seção "Novo Orçamento"
            </p>
          </div>
        )}
      </div>

      {showModal && selectedOrcamento && (
        <div className="modal">
          <div className="modal-content" style={{ maxWidth: '800px' }}>
            <div className="modal-header">
              <h2 className="modal-title">
                <FileText size={20} style={{ marginRight: '8px' }} />
                Orçamento - {selectedOrcamento.cliente}
              </h2>
              <button className="close" onClick={closeModal}>
                ✕
              </button>
            </div>
            
            <div style={{ marginBottom: '20px' }}>
              <p><strong>Cliente:</strong> {selectedOrcamento.cliente}</p>
              <p><strong>Data:</strong> {formatDate(selectedOrcamento.dataCriacao)}</p>
              {selectedOrcamento.observacoes && (
                <p><strong>Observações:</strong> {selectedOrcamento.observacoes}</p>
              )}
            </div>

            <div className="card" style={{ marginBottom: '20px' }}>
              <h3 style={{ marginBottom: '15px' }}>Itens do Orçamento</h3>
              <table className="table">
                <thead>
                  <tr>
                    <th>Produto</th>
                    <th>Quantidade</th>
                    <th>Preço Unit.</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedOrcamento.itens.map((item) => (
                    <tr key={item.id}>
                      <td>{item.nome}</td>
                      <td>{item.quantidade}</td>
                      <td>{formatCurrency(item.preco)}</td>
                      <td>{formatCurrency(item.subtotal)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="total-section">
              <h3>Total: {formatCurrency(selectedOrcamento.total)}</h3>
            </div>

            <div className="text-right">
              <button className="btn" onClick={closeModal}>
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orcamentos; 