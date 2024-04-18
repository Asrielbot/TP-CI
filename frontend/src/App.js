import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [contacts, setContacts] = useState([]);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });

  useEffect(() => {
    axios.get('http://localhost:5000/contacts')
    .then(response => {
      // traitement de la réponse
    })
    .catch(error => {
      if (error.response) {
        // La requête a été faite et le serveur a répondu avec un statut hors de la plage 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // La requête a été faite mais aucune réponse n'a été reçue
        console.log(error.request);
      } else {
        // Quelque chose s'est mal passé lors de la mise en place de la requête
        console.log('Error', error.message);
      }
      console.log(error.config);
  });

  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/contacts', formData)
      .then(response => {
        setContacts([...contacts, response.data]);
        setFormData({ name: '', email: '', phone: '' });
      })
      .catch(error => console.log(error));
  };

  return (
    <div>
      <h1>Contact Manager</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone"
          required
        />
        <button type="submit">Add Contact</button>
      </form>
      <ul>
        {contacts.map(contact => (
          <li key={contact._id}>{contact.name} - {contact.email} - {contact.phone}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;

