// src/components/Editor.js

import React, { useState, useEffect } from 'react';

const Editor = ({ username }) => {
  const [editorContent, setEditorContent] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Sync the editor content from localStorage
    const storedContent = localStorage.getItem('editorContent');
    const storedUsers = localStorage.getItem('editorUsers');

    if (storedContent) {
      setEditorContent(storedContent);
    }

    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    }

    // Listen for changes in localStorage from other tabs
    const handleStorageChange = () => {
      const updatedContent = localStorage.getItem('editorContent');
      const updatedUsers = localStorage.getItem('editorUsers');
      if (updatedContent) {
        setEditorContent(updatedContent);
      }
      if (updatedUsers) {
        setUsers(JSON.parse(updatedUsers));
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleEditorChange = (e) => {
    const newContent = e.currentTarget.innerText;
    setEditorContent(newContent);

    // Update localStorage when the editor content changes
    localStorage.setItem('editorContent', newContent);

    // Track users and who made the change
    const updatedUsers = [...users];
    if (!updatedUsers.includes(username)) {
      updatedUsers.push(username);
    }
    localStorage.setItem('editorUsers', JSON.stringify(updatedUsers));
  };

  return (
    <div className="min-h-screen bg-gray-800 p-6 flex flex-col items-center">
      <div className="w-full max-w-3xl bg-white p-4 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold text-gray-700 mb-2">Collaborative Text Editor</h2>
        <div
          className="border p-4 rounded-lg bg-gray-100 text-gray-800 h-96 overflow-y-auto"
          contentEditable
          onInput={handleEditorChange}
          dangerouslySetInnerHTML={{ __html: editorContent }}
        />
        <div className="mt-2">
          <h3 className="font-semibold text-gray-600">Users Currently Editing:</h3>
          <ul>
            {users.map((user, index) => (
              <li key={index} className="text-gray-400">{user}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Editor;
