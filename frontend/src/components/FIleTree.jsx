import React, { useState, useEffect } from 'react';
import fileService from '../services/fileService';
import '../styles/FileTree.css';

const FileTree = ({ files: initialFiles, onSelectFile, projectId, onDeleteFile }) => {
  const [files, setFiles] = useState(initialFiles);
  const [editingFileId, setEditingFileId] = useState(null);
  const [editingFileName, setEditingFileName] = useState('');

  useEffect(() => {
    setFiles(initialFiles);
  }, [initialFiles]);

  const handleRightClick = (e, fileId, currentName) => {
    e.preventDefault();
    setEditingFileId(fileId);
    setEditingFileName(currentName);
  };

  const handleRenameFile = async (fileId, newName) => {
    if (!newName.trim() || files.some(f => f.filename === newName)) {
      alert("File name is required and must be unique");
      return;
    }
  
    try {
      await fileService.updateFile(fileId, { filename: newName });
      setFiles(files.map(file =>
        file.id === fileId ? { ...file, filename: newName } : file
      ));
      setEditingFileId(null);
      setEditingFileName(newName);
    } catch (error) {
      console.error("Error renaming file:", error);
    }
  };

  const handleKeyPress = (e, fileId) => {
    if (e.key === 'Enter') {
      handleRenameFile(fileId, editingFileName);
    }
  };

  const handleChangeFileName = (e) => {
    setEditingFileName(e.target.value);
  };

  const handleCreateNewFile = async () => {
    let newFileName = 'New File';
    let counter = 1;
    while (files.some(f => f.filename === newFileName)) {
        newFileName = `New File (${counter++})`;
    }

    try {
        // Create the file on the server
        const response = await fileService.createFile(projectId, newFileName, '');
        const newFile = response.data.file;

        // Add the new file to the files state immediately
        setFiles(prevFiles => [
            ...prevFiles,
            { id: newFile.id, filename: newFile.filename, type: 'file' },
        ]);

        // Set the new file for editing
        setEditingFileId(newFile.id);
        setEditingFileName(newFile.filename);
    } catch (error) {
        console.error("Error creating file:", error);
    }
};

  return (
    <div className="file-tree-container">
      <div className="file-tree-header">
        <button className="create-file-btn" onClick={handleCreateNewFile}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M5 12h14"></path>
          </svg>
        </button>
      </div>
      <div className="file-tree">
        {files.map(file => (
          <div key={file.id} className="file-item">
            {editingFileId === file.id ? (
              <input
                type="text"
                value={editingFileName}
                onChange={handleChangeFileName}
                onKeyDown={(e) => handleKeyPress(e, file.id)}
                autoFocus
                onBlur={() => setEditingFileId(null)}
                placeholder="Enter file name"
              />
            ) : (
              <span
                onDoubleClick={(e) => handleRightClick(e, file.id, file.filename)}
                onContextMenu={(e) => handleRightClick(e, file.id, file.filename)}
                onClick={() => onSelectFile(file.id)}
              >
                 {file.filename}
              </span>
            )}
            {onDeleteFile && (
              <button 
                className="delete-file-btn"
                onClick={() => onDeleteFile(file.id)}
              >
                🗑️
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileTree;
