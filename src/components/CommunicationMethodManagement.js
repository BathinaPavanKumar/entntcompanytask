import React, { useState } from 'react';

const defaultMethods = [
  { id: '1', name: 'LinkedIn Post', description: 'Post on LinkedIn', sequence: 1, mandatory: false },
  { id: '2', name: 'LinkedIn Message', description: 'Direct message on LinkedIn', sequence: 2, mandatory: false },
  { id: '3', name: 'Email', description: 'Send an email', sequence: 3, mandatory: false },
  { id: '4', name: 'Phone Call', description: 'Make a phone call', sequence: 4, mandatory: false },
  { id: '5', name: 'Other', description: 'Other communication method', sequence: 5, mandatory: false },
];

const CommunicationMethodManagement = () => {
  const [methods, setMethods] = useState(defaultMethods);
  const [newMethod, setNewMethod] = useState({});
  const [editingMethod, setEditingMethod] = useState(null);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === 'checkbox' ? checked : value;
    if (editingMethod) {
      setEditingMethod({ ...editingMethod, [name]: inputValue });
    } else {
      setNewMethod(prev => ({ ...prev, [name]: inputValue }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingMethod) {
      setMethods(methods.map(method => 
        method.id === editingMethod.id ? editingMethod : method
      ));
      setEditingMethod(null);
    } else {
      const method = {
        id: Date.now().toString(),
        ...newMethod,
        sequence: methods.length + 1,
      };
      setMethods(prev => [...prev, method]);
    }
    setNewMethod({});
  };

  const handleEdit = (method) => {
    if (!defaultMethods.some(m => m.id === method.id)) {
      setEditingMethod(method);
    }
  };

  const handleDelete = (id) => {
    if (!defaultMethods.some(m => m.id === id)) {
      setMethods(methods.filter(method => method.id !== id));
    }
  };

  const handleCancel = () => {
    setEditingMethod(null);
    setNewMethod({});
  };

  return (
    <div className="communication-method-management">
      <h3>Communication Method Management</h3>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          value={(editingMethod?.name || newMethod.name) || ''}
          onChange={handleInputChange}
          placeholder="Method Name"
          required
        />
        <input
          name="description"
          value={(editingMethod?.description || newMethod.description) || ''}
          onChange={handleInputChange}
          placeholder="Description"
          required
        />
        <label>
          <input
            type="checkbox"
            name="mandatory"
            checked={(editingMethod?.mandatory || newMethod.mandatory) || false}
            onChange={handleInputChange}
          />
          Mandatory
        </label>
        <button type="submit">{editingMethod ? 'Update' : 'Add'} Method</button>
        {editingMethod && <button type="button" onClick={handleCancel}>Cancel</button>}
      </form>
      <ul>
        {methods.map(method => (
          <li key={method.id}>
            {method.sequence}. {method.name} - {method.description} 
            {method.mandatory ? ' (Mandatory)' : ''}
            {!defaultMethods.some(m => m.id === method.id) && (
              <>
                <button onClick={() => handleEdit(method)}>Edit</button>
                <button onClick={() => handleDelete(method.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommunicationMethodManagement;

