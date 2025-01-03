import React, { useState } from 'react';
import CompanyManagement from './CompanyManagement';
import CommunicationMethodManagement from './CommunicationMethodManagement';

const AdminModule = () => {
  const [activeTab, setActiveTab] = useState('company');

  return (
    <div className="admin-module">
      <h2>Admin Module</h2>
      <div className="tabs">
        <button onClick={() => setActiveTab('company')} className={activeTab === 'company' ? 'active' : ''}>
          Company Management
        </button>
        <button onClick={() => setActiveTab('method')} className={activeTab === 'method' ? 'active' : ''}>
          Communication Method Management
        </button>
      </div>
      {activeTab === 'company' ? <CompanyManagement /> : <CommunicationMethodManagement />}
    </div>
  );
};

export default AdminModule;

