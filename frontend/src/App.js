import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Produtos from './components/Produtos';
import Orcamentos from './components/Orcamentos';
import NovoOrcamento from './components/NovoOrcamento';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <div className="container">
            <div className="flex justify-between items-center">
              <Link to="/" className="navbar-brand">
                Sistema de Orçamentos
              </Link>
              <ul className="navbar-nav">
                <li>
                  <Link to="/produtos">Produtos</Link>
                </li>
                <li>
                  <Link to="/orcamentos">Orçamentos</Link>
                </li>
                <li>
                  <Link to="/novo-orcamento">Novo Orçamento</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="container">
          <Routes>
            <Route path="/" element={
              <div className="card">
                <h1>Bem-vindo ao Sistema de Orçamentos</h1>
                <p>Use o menu acima para navegar pelas funcionalidades:</p>
                <ul style={{ marginTop: '20px', marginLeft: '20px' }}>
                  <li><strong>Produtos:</strong> Cadastre e gerencie seus produtos</li>
                  <li><strong>Orçamentos:</strong> Visualize todos os orçamentos criados</li>
                  <li><strong>Novo Orçamento:</strong> Crie um novo orçamento para um cliente</li>
                </ul>
              </div>
            } />
            <Route path="/produtos" element={<Produtos />} />
            <Route path="/orcamentos" element={<Orcamentos />} />
            <Route path="/novo-orcamento" element={<NovoOrcamento />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App; 