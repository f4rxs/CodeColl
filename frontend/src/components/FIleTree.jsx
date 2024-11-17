import React, { useState, useEffect, useRef } from 'react';
import fileService from '../services/fileService';
import fileVersionService from '../services/fileVersionService';
import '../styles/FileTree.css';

const FileTree = ({ 
  files: initialFiles, 
  onSelectFile, 
  projectId, 
  onDeleteFile, 
  showLockOption, 
  userId, 
  collaborators, 
  isOwner, 
  canEdit // User's permission to edit/create files
}) => {
  const [files, setFiles] = useState(initialFiles);
  const [editingFileId, setEditingFileId] = useState(null);
  const [editingFileName, setEditingFileName] = useState('');
  const [fileVersions, setFileVersions] = useState([]);
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
  const [selectedFileId, setSelectedFileId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const inputRef = useRef(null);

  useEffect(() => {
    setFiles(initialFiles);
  }, [initialFiles]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (inputRef.current && !inputRef.current.contains(e.target)) {
        setEditingFileId(null);
        setIsEditing(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleRightClick = async (e, fileId, currentName) => {
    e.preventDefault();
    if (isEditing) return;

    setEditingFileId(fileId);
    setEditingFileName(currentName);

    try {
      const response = await fileVersionService.findFileVersions(fileId);
      setFileVersions(response.data);
    } catch (error) {
      console.error("Error fetching file versions:", error);
      setFileVersions([]);
    }

    setShowContextMenu(true);
    setContextMenuPosition({ x: e.pageX, y: e.pageY });
    setSelectedFileId(fileId);
  };

  const handleDoubleClick = (e, fileId, currentName) => {
    e.preventDefault();
    if(!canEdit) return;
    if (isEditing) return;

    const file = files.find(f => f.id === fileId);
    if (!file || (file.locked_by && file.locked_by !== userId && !isOwner)) {
      alert('This file is locked and cannot be edited.');
      return;
    }

    setIsEditing(true);
    setEditingFileId(fileId);
    setEditingFileName(currentName);
  };

  const handleRenameFile = async (fileId, newName) => {
    if (!newName.trim()) {
      alert("File name cannot be empty.");
      return;
    }

    if (files.some(f => f.filename === newName && f.id !== fileId)) {
      alert("File name must be unique.");
      return;
    }

    try {
      await fileService.updateFile(fileId, { filename: newName });
      setFiles(files.map(file =>
        file.id === fileId ? { ...file, filename: newName } : file
      ));
      setEditingFileId(null);
      setIsEditing(false);
    } catch (error) {
      console.error("Error renaming file:", error);
      alert("Failed to rename file.");
    }
  };

  const handleKeyPress = (e, fileId) => {
    if (e.key === 'Enter') {
      handleRenameFile(fileId, editingFileName);
    }
  };

  const handleCreateNewFile = async () => {
    let newFileName = 'New File';
    let counter = 1;

    while (files.some(f => f.filename === newFileName)) {
      newFileName = `New File (${counter++})`;
    }

    try {
      const response = await fileService.createFile(projectId, newFileName, '');
      const newFile = response.data.file;

      setFiles(prevFiles => [
        ...prevFiles,
        { id: newFile.id, filename: newFile.filename, type: 'file' },
      ]);

      setEditingFileId(newFile.id);
      setEditingFileName(newFile.filename);
    } catch (error) {
      console.error("Error creating file:", error);
    }
  };

  const handleRestoreVersion = async (versionId) => {
    try {
      const response = await fileVersionService.restoreFileVersion(selectedFileId, versionId);
      console.log("File restored:", response.data);
    } catch (error) {
      console.error("Error restoring file version:", error);
    }
    setShowContextMenu(false);
  };

  const handleLockFile = async (fileId) => {
    try {
      await fileService.lockFileForEditing(fileId, userId);
      setFiles(files.map(file =>
        file.id === fileId ? { ...file, locked_by: userId } : file
      ));
    } catch (error) {
      console.error('Error locking file:', error);
      alert('Failed to lock file.');
    }
  };

  const handleUnlockFile = async (fileId) => {
    try {
      await fileService.unlockFileAfterEditing(fileId, userId);
      setFiles(files.map(file =>
        file.id === fileId ? { ...file, locked_by: null } : file
      ));
    } catch (error) {
      console.error('Error unlocking file:', error);
      alert('Failed to unlock file.');
    }
  };

  const getLockerName = (lockedBy) => {
    const locker = collaborators.find(collab => collab.user_id === lockedBy);
    return locker ? locker.user.username : 'Unknown';
  };

  const handleCloseContextMenu = () => {
    setShowContextMenu(false);
  };

  return (
    <div className="file-tree-container">
      <div className="file-tree-header">
        {canEdit && (
          <button className="create-file-btn" onClick={handleCreateNewFile}>
            ➕
          </button>
        )}
      </div>
      <div className="file-tree">
        {files.map(file => (
          <div key={file.id} className={`file-item ${file.locked_by ? 'locked' : ''}`}>
            {editingFileId === file.id ? (
              <input
                ref={inputRef}
                type="text"
                value={editingFileName}
                onChange={(e) => setEditingFileName(e.target.value)}
                onKeyDown={(e) => handleKeyPress(e, file.id)}
                autoFocus
                placeholder="Enter file name"
              />
            ) : (
              <span
                onDoubleClick={(e) => handleDoubleClick(e, file.id, file.filename)}
                onContextMenu={(e) => handleRightClick(e, file.id, file.filename)}
                onClick={() =>
                  (!file.locked_by || file.locked_by === userId || isOwner) && onSelectFile(file.id)
                }
              >
                {file.filename}
              </span>
            )}
            {file.locked_by && (
              <span className="file-lock-status">
                🔒 Locked by {getLockerName(file.locked_by)}
              </span>
            )}
            {file.locked_by === userId && (
              <button
                className="unlock-file-btn"
                onClick={() => handleUnlockFile(file.id)}
              >
                🔓 Unlock
              </button>
            )}
            {showLockOption && !file.locked_by && (
              <button 
                className="lock-file-btn"
                onClick={() => handleLockFile(file.id)}
              >
                🔐 Lock
              </button>
            )}
            {onDeleteFile && (
              <button 
                className="delete-file-btn"
                onClick={() => onDeleteFile(file.id)}
              >
                🗑️ Delete
              </button>
            )}
          </div>
        ))}
      </div>

      {showContextMenu && (
        <div 
          className="context-menu"
          style={{ top: contextMenuPosition.y, left: contextMenuPosition.x }}
          onClick={handleCloseContextMenu}
        >
          <div className="context-menu-header">File Versions</div>
          <ul>
            {fileVersions.map((version) => (
              <li key={version.id} onClick={() => handleRestoreVersion(version.id)}>
                Version {version.version_number}: {version.created_at}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FileTree;
