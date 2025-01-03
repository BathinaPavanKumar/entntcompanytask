import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminModule from './components/AdminModule';
import UserModule from './components/UserModule';
import ReportingModule from './components/ReportingModule';
import Navigation from './components/Navigation';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <Routes>
          <Route path="/admin" element={<AdminModule />} />
          <Route path="/user" element={<UserModule />} />
          <Route path="/reporting" element={<ReportingModule />} />
          <Route path="/" element={<UserModule />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

