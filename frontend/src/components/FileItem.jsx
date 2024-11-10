import React from 'react';

const FileItem = ({ icon, filename }) => (
  <div className="file-item">
    <span className="file-item__icon">{icon}</span>
    <span className="file-item__filename">{filename}</span>
  </div>
);

export default FileItem;