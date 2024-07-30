import React, { useState } from 'react';
import axios from 'axios';
import { apiUrl } from '../../constants.js';

import styles from '../../../src/styles.scss';

const LoginView = ({ onLoggedIn }) => {
  const [Username, setUsername] = useState('');
  const [Password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiUrl}/login`, {
        Username,
        Password
      });
      if (response.status === 200) {
        alert('Login successful');
        onLoggedIn();
      }
    } catch (error) {
      alert('Invalid username or password');
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" value={Username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={Password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginView;
