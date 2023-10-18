import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import AddBook from './components/AddBook';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="py-4">
          <nav className="container">
            <ul className="nav nav-tabs">
              <li className="nav-item">
                <Link to="/" className="nav-link text-white">Accueil</Link>
              </li>
              <li className="nav-item">
                <Link to="/add-book" className="nav-link text-white">Ajouter un livre</Link>
              </li>
            </ul>
          </nav>
        </header>
        <Routes> 
          <Route path="/add-book" element={<AddBook />} /> 
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;