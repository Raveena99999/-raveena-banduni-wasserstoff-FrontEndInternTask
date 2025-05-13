import React, { useState, useEffect, useRef } from "react";

const Editor = ({ username }) => {
  const editorRef = useRef(null);
  const [editorContent, setEditorContent] = useState("");
  const [users, setUsers] = useState([]);
  const [lastEditor, setLastEditor] = useState("");
  const [isEditable, setIsEditable] = useState(false);

  useEffect(() => {
    const defaultContent =
      "Welcome! Click Edit to start modifying this shared content.";
    const storedContent =
      localStorage.getItem("editorContent") || defaultContent;
    const storedUsers = JSON.parse(localStorage.getItem("editorUsers")) || [];
    const storedLastEditor = localStorage.getItem("editorLastEditor") || "";

    setEditorContent(storedContent);
    setLastEditor(storedLastEditor);

    if (!storedUsers.includes(username)) {
      const updatedUsers = [...storedUsers, username];
      localStorage.setItem("editorUsers", JSON.stringify(updatedUsers));
      setUsers(updatedUsers);
    } else {
      setUsers(storedUsers);
    }

    const handleStorageChange = () => {
      const updatedContent =
        localStorage.getItem("editorContent") || defaultContent;
      const updatedUsers =
        JSON.parse(localStorage.getItem("editorUsers")) || [];
      const updatedLastEditor = localStorage.getItem("editorLastEditor") || "";
      setEditorContent(updatedContent);
      setUsers(updatedUsers);
      setLastEditor(updatedLastEditor);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [username]);

  useEffect(() => {
    if (editorRef.current && !isEditable) {
      editorRef.current.innerText = editorContent;
    }
  }, [editorContent, isEditable]);

  const handleEditorChange = () => {
    const newContent = editorRef.current.innerText;
    setEditorContent(newContent);
  };

  const handleSave = () => {
    const newContent = editorRef.current.innerText;
    localStorage.setItem("editorContent", newContent);
    localStorage.setItem("editorLastEditor", username);
    setEditorContent(newContent);
    setLastEditor(username);
    setIsEditable(false);
  };

  return (
    <div className="min-h-screen bg-gray-800 p-6 flex flex-col items-center">
      <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold text-gray-700 mb-4">
          Collaborative Editor
        </h2>

        <p className="text-sm text-gray-600 mb-2">
          <strong>Last Edited By:</strong> {lastEditor || "No edits yet"}
        </p>

        <div
          ref={editorRef}
          className={`border p-4 rounded-lg bg-gray-100 text-gray-800 h-96 overflow-y-auto whitespace-pre-wrap ${
            isEditable ? "outline outline-blue-500" : ""
          }`}
          contentEditable={isEditable}
          suppressContentEditableWarning
          onInput={handleEditorChange}
        />

        <div className="mt-4">
          {isEditable ? (
            <button
              className="bg-green-600 text-white px-4 py-2 rounded"
              onClick={handleSave}
            >
              Save
            </button>
          ) : (
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() => setIsEditable(true)}
            >
              Edit
            </button>
          )}
        </div>

        <div className="mt-6">
          <h3 className="font-semibold text-gray-700">Users Online:</h3>
          <ul className="list-disc ml-5 mt-1 text-gray-600">
            {users.map((user, idx) => (
              <li key={idx}>{user}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Editor;
