import React, { useState, useEffect } from 'react';
import MonacoEditor from '@monaco-editor/react';
import fileService from '../services/fileService';

const FileEditor = ({ fileId }) => {
    const [content, setContent] = useState('');
    const [language, setLanguage] = useState('javascript'); // Default language; you can make this dynamic

    useEffect(() => {
        const fetchFileContent = async () => {
            try {
                const response = await fileService.getFileById(fileId);
                setContent(response.data.file.content || ''); // Assuming content is a field in response
                setLanguage(response.data.language || 'javascript'); // Set language dynamically
            } catch (error) {
                console.error("Error loading file content:", error);
            }
        };

        fetchFileContent();
    }, [fileId]);

    const handleEditorChange = (newContent) => {
        setContent(newContent);
    };

    const handleSave = async () => {
        try {
            await fileService.updateFile(fileId, {content});
            alert('File saved successfully!');
        } catch (error) {
            console.error("Error saving file:", error);
            alert('Failed to save file.');
        }
    };

    // Define Monaco custom theme
    useEffect(() => {
        const applyCustomTheme = () => {
            if (window.monaco) {
                window.monaco.editor.defineTheme('custom-dark', {
                    base: 'vs-dark', // Use the dark base theme
                    inherit: true,
                    rules: [],
                    colors: {
                        'editor.background': '#0d1117',
                        'editor.foreground': '#f5f5f5',
                        'editorCursor.foreground': '#ffffff',
                        'editor.lineHighlightBackground': '#2c2f38',
                        'editor.selectionBackground': '#3e4a58',
                        'editor.inactiveSelectionBackground': '#3e4a58',
                    }
                });
                window.monaco.editor.setTheme('custom-dark');
            }
        };
    
        // Check if Monaco is ready to be used
        const interval = setInterval(() => {
            if (window.monaco) {
                applyCustomTheme();
                clearInterval(interval); // Clear the interval once Monaco is ready
            }
        }, 100); // Retry every 100ms until Monaco is ready
    
        return () => clearInterval(interval); // Clean up the interval on component unmount
    }, []);
    
    return (
        <div className="file-editor-container">
            <div className="editor-wrapper">
                <MonacoEditor
                    height="500px"
                    language={language}
                    value={content}
                    onChange={handleEditorChange}
                    theme="custom-dark" // Apply custom theme
                />
                <button className="save-button" onClick={handleSave}>
                    Save
                </button>
            </div>
        </div>
    );
};

export default FileEditor;
