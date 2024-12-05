import React, { useEffect, useState, version } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism'; 
import { format } from 'date-fns';
import fileVersionService from '../services/fileVersionService';
import '../styles/FileVersionPage.css'; 

const FileVersionPage = () => {
  const { fileId, versionNumber } = useParams();
  const navigate = useNavigate();
  const [versionContent, setVersionContent] = useState('');
  const [versionId, setVersionId] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVersionContent = async () => {
      try {
        const response = await fileVersionService.getFileVersionContext(fileId, versionNumber);
        setVersionContent(response.data.context);
        setVersionId(response.data.id);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching version content:", err);
        setError('Failed to load version content');
        setLoading(false);
      }
    };

    fetchVersionContent();
  }, [fileId, versionNumber]);
  
 


  const handleRestoreVersion = async () => {
    try {
      await fileVersionService.restoreFileVersion(fileId, versionId);
      alert('Version restored successfully!');
      navigate(-1); // Redirect to the project page
    } catch (err) {
      console.error("Error restoring version:", err);
      alert('Failed to restore version.');
    }
  };

  if (loading) return <div className="loading-message">Loading version...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="file-version-page">
      <h2 className="version-header">Viewing Version {versionNumber}</h2>
      <div className="version-content">
        <SyntaxHighlighter language="javascript" style={atomDark}>
          {versionContent}
        </SyntaxHighlighter>
      </div>
      <div className="actions">
        <button className="restore-button" onClick={handleRestoreVersion}>
          Restore This Version
        </button>
        <button className="back-button" onClick={() => navigate(-1)}>
          Back
        </button>
      </div>
    </div>
  );
};

export default FileVersionPage;
