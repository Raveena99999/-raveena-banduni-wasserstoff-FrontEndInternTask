
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username.trim()) {
      localStorage.setItem('username', username);
      navigate('/editor');

    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-800">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Enter your Username</h2>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 rounded mb-4"
          placeholder="Username"
        />
        <button
          onClick={handleLogin}
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Enter Editor
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
