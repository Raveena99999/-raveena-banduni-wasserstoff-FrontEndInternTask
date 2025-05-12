

import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Editor from './components/Editor';
import LoginPage from './pages/LoginPage';

const App = () => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/editor"
          element={
            username ? <Editor username={username} /> : <Navigate to="/" replace />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;



