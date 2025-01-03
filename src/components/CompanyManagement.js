import React, { useState } from 'react';

const CompanyManagement = () => {
  const [companies, setCompanies] = useState([]);
  const [newCompany, setNewCompany] = useState({});
  const [editingCompany, setEditingCompany] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editingCompany) {
      setEditingCompany({ ...editingCompany, [name]: value });
    } else {
      setNewCompany(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingCompany) {
      setCompanies(companies.map(company => 
        company.id === editingCompany.id ? {
          ...editingCompany,
          emails: Array.isArray(editingCompany.emails) ? editingCompany.emails : editingCompany.emails.split(',').map(email => email.trim()),
          phoneNumbers: Array.isArray(editingCompany.phoneNumbers) ? editingCompany.phoneNumbers : editingCompany.phoneNumbers.split(',').map(phone => phone.trim())
        } : company
      ));
      setEditingCompany(null);
    } else {
      const company = {
        id: Date.now().toString(),
        ...newCompany,
        emails: newCompany.emails?.split(',').map(email => email.trim()) || [],
        phoneNumbers: newCompany.phoneNumbers?.split(',').map(phone => phone.trim()) || [],
      };
      setCompanies(prev => [...prev, company]);
    }
    setNewCompany({});
  };

  const handleEdit = (company) => {
    setEditingCompany({
      ...company,
      emails: Array.isArray(company.emails) ? company.emails.join(', ') : company.emails,
      phoneNumbers: Array.isArray(company.phoneNumbers) ? company.phoneNumbers.join(', ') : company.phoneNumbers
    });
  };

  const handleDelete = (id) => {
    setCompanies(companies.filter(company => company.id !== id));
  };

  const handleCancel = () => {
    setEditingCompany(null);
    setNewCompany({});
  };

  return (
    <div className="company-management">
      <h3>Company Management</h3>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          value={(editingCompany?.name || newCompany.name) || ''}
          onChange={handleInputChange}
          placeholder="Company Name"
          required
        />
        <input
          name="location"
          value={(editingCompany?.location || newCompany.location) || ''}
          onChange={handleInputChange}
          placeholder="Location"
          required
        />
        <input
          name="linkedInProfile"
          value={(editingCompany?.linkedInProfile || newCompany.linkedInProfile) || ''}
          onChange={handleInputChange}
          placeholder="LinkedIn Profile"
          required
        />
        <input
          name="emails"
          value={(editingCompany?.emails || newCompany.emails) || ''}
          onChange={handleInputChange}
          placeholder="Emails (comma-separated)"
          required
        />
        <input
          name="phoneNumbers"
          value={(editingCompany?.phoneNumbers || newCompany.phoneNumbers) || ''}
          onChange={handleInputChange}
          placeholder="Phone Numbers (comma-separated)"
          required
        />
        <textarea
          name="comments"
          value={(editingCompany?.comments || newCompany.comments) || ''}
          onChange={handleInputChange}
          placeholder="Comments"
        />
        <input
          name="communicationPeriodicity"
          type="number"
          value={(editingCompany?.communicationPeriodicity || newCompany.communicationPeriodicity) || ''}
          onChange={handleInputChange}
          placeholder="Communication Periodicity (weeks)"
          required
        />
        <button type="submit">{editingCompany ? 'Update' : 'Add'} Company</button>
        {editingCompany && <button type="button" onClick={handleCancel}>Cancel</button>}
      </form>
      <ul>
        {companies.map(company => (
          <li key={company.id}>
            {company.name} - {company.location}
            <button onClick={() => handleEdit(company)}>Edit</button>
            <button onClick={() => handleDelete(company.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CompanyManagement;

