import React, { useState } from 'react';

const Dashboard = () => {
  const [companies, setCompanies] = useState([]);
  const [newCompany, setNewCompany] = useState({ name: '', nextCommunication: '' });
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const [communicationType, setCommunicationType] = useState('');

  const handleAddCompany = (e) => {
    e.preventDefault();
    const company = {
      id: Date.now().toString(),
      name: newCompany.name,
      nextCommunication: newCompany.nextCommunication,
      communications: []
    };
    setCompanies([...companies, company]);
    setNewCompany({ name: '', nextCommunication: '' });
  };

  const handleCompanySelect = (companyId) => {
    setSelectedCompanies(prev =>
      prev.includes(companyId)
        ? prev.filter(id => id !== companyId)
        : [...prev, companyId]
    );
  };

  const handleLogCommunication = () => {
    if (selectedCompanies.length === 0 || !communicationType) {
      alert('Please select at least one company and a communication type');
      return;
    }

    const today = new Date().toISOString().split('T')[0];

    setCompanies(prevCompanies => 
      prevCompanies.map(company => {
        if (selectedCompanies.includes(company.id)) {
          return {
            ...company,
            communications: [
              { type: communicationType, date: today },
              ...company.communications.slice(0, 4)
            ],
            nextCommunication: 'Not Set'
          };
        }
        return company;
      })
    );

    setSelectedCompanies([]);
    setCommunicationType('');
  };

  return (
    <div className="dashboard">
      <h3>Dashboard</h3>
      <form onSubmit={handleAddCompany}>
        <input
          type="text"
          value={newCompany.name}
          onChange={(e) => setNewCompany({...newCompany, name: e.target.value})}
          placeholder="Company Name"
          required
        />
        <input
          type="date"
          value={newCompany.nextCommunication}
          onChange={(e) => setNewCompany({...newCompany, nextCommunication: e.target.value})}
          required
        />
        <button type="submit">Add Company</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Select</th>
            <th>Company Name</th>
            <th>Last Five Communications</th>
            <th>Next Scheduled Communication</th>
          </tr>
        </thead>
        <tbody>
          {companies.map(company => (
            <tr key={company.id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedCompanies.includes(company.id)}
                  onChange={() => handleCompanySelect(company.id)}
                />
              </td>
              <td>{company.name}</td>
              <td>
                {company.communications.map((comm, index) => (
                  <div key={index}>
                    {comm.type} - {comm.date}
                  </div>
                ))}
              </td>
              <td>{company.nextCommunication}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <select
          value={communicationType}
          onChange={(e) => setCommunicationType(e.target.value)}
        >
          <option value="">Select Communication Type</option>
          <option value="Email">Email</option>
          <option value="Phone Call">Phone Call</option>
          <option value="LinkedIn Message">LinkedIn Message</option>
          <option value="LinkedIn Post">LinkedIn Post</option>
          <option value="Other">Other</option>
        </select>
        <button onClick={handleLogCommunication} disabled={selectedCompanies.length === 0 || !communicationType}>
          Log Communication
        </button>
      </div>
    </div>
  );
};

export default Dashboard;

