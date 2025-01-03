import React, { useState } from 'react';
import Dashboard from './Dashboard';
import CalendarView from './CalendarView';

const UserModule = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="user-module">
      <h2>User Module</h2>
      <div className="tabs">
        <button onClick={() => setActiveTab('dashboard')} className={activeTab === 'dashboard' ? 'active' : ''}>
          Dashboard
        </button>
        <button onClick={() => setActiveTab('calendar')} className={activeTab === 'calendar' ? 'active' : ''}>
          Calendar View
        </button>
      </div>
      {activeTab === 'dashboard' ? <Dashboard /> : <CalendarView />}
    </div>
  );
};

export default UserModule;

