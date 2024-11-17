import React, { useState, useEffect } from 'react';
import MonacoEditor from '@monaco-editor/react';
import fileService from '../services/fileService';
import fileVersionService from '../services/fileVersionService';
import { getCodeSuggestion } from '../services/aiService';
import { runCode } from '../services/judge0Service';
import { toast, ToastContainer } from 'react-toastify';

// Map for language names to Judge0's language IDs
const languageMap = {
    javascript: '63',
    python: '71',
    c: '50',
    cpp: '54',
    java: '62',
    ruby: '72',
    go: '60',
    php: '72',
    html: '77',
    css: '78',
    typescript: '69',
};

const FileEditor = ({ fileId, canEdit }) => {
    const [suggestion, setSuggestion] = useState('');
    const [content, setContent] = useState('');
    const [language, setLanguage] = useState('javascript');
    const [executionResult, setExecutionResult] = useState('');

    useEffect(() => {
        const fetchFileContent = async () => {
            try {
                const response = await fileService.getFileById(fileId);
                setContent(response.data.file.content || '');
            } catch (error) {
                console.error("Error loading file content:", error);
            }
        };

        fetchFileContent();
    }, [fileId]);

    const handleEditorChange = (newContent) => {
        if (canEdit) {
            setContent(newContent);
        } 
    };

    const handleSave = async () => {
        if (!canEdit) {
            alert("You don't have permission to save this file.");
            
            return;
        }

        try {
            const versionData = {
                timestamp: new Date().toISOString(),
                context: content,
            };

            await fileVersionService.createFileVersion(fileId, versionData);
            await fileService.updateFile(fileId, { content });
            alert('File saved successfully!');
        } catch (error) {
            console.error("Error saving file:", error);
            alert('Failed to save file.');
        }
    };

    const handleSuggestion = async () => {
        try {
            const generatedSuggestion = await getCodeSuggestion(content, language);
            setSuggestion(generatedSuggestion);
        } catch (error) {
            alert("Failed to fetch suggestion.");
        }
    };

    const handleExecuteCode = async () => {
        try {
            const languageId = languageMap[language];
            if (!languageId) {
                alert('Language not supported for execution.');
                return;
            }

            const result = await runCode(content, languageId);
            setExecutionResult(result.stdout || result.stderr || 'No output');
        } catch (error) {
            alert('Failed to execute code.');
        }
    };

    useEffect(() => {
        const applyCustomTheme = () => {
            if (window.monaco) {
                window.monaco.editor.defineTheme('custom-dark', {
                    base: 'vs-dark',
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

        const interval = setInterval(() => {
            if (window.monaco) {
                applyCustomTheme();
                clearInterval(interval);
            }
        }, 100);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="file-editor-container">
            <div className="editor-wrapper">
                <div className="language-selector">
                    <label htmlFor="language-select">Select Language: </label>
                    <select
                        id="language-select"
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        style={{ width: '200px', overflowY: 'auto', maxHeight: '150px' }}
                        disabled={!canEdit} // Disabling language selection if the user can't edit
                    >
                        {Object.keys(languageMap).map((langKey) => (
                            <option key={langKey} value={langKey}>
                                {langKey.charAt(0).toUpperCase() + langKey.slice(1)}
                            </option>
                        ))}
                    </select>
                </div>

                <MonacoEditor
                    height="500px"
                    language={language}
                    value={content}
                    onChange={handleEditorChange}
                    theme="custom-dark"
                    options={{
                        readOnly: !canEdit, 
                    }}
                />
                <div className="editor-buttons">
                    <button className="save-button" onClick={handleSave} disabled={!canEdit}>
                        Save
                    </button>
                    <button className="suggestion-button" onClick={handleSuggestion}>
                        Get AI Suggestion
                    </button>
                    <button className="execute-button" onClick={handleExecuteCode}>
                        Execute Code
                    </button>
                </div>
            </div>


            {/* this feature is not set  */}
            {suggestion && (
                <div className="suggestion-box">
                    <h4>AI Suggestion:</h4>
                    <pre>{suggestion}</pre>
                    <button onClick={() => setContent(content + suggestion)} disabled={!canEdit}>
                        Apply Suggestion
                    </button>
                    <button onClick={() => setSuggestion('')}>
                        Dismiss
                    </button>
                </div>
            )}
            {executionResult && (
                <div className="execution-result">
                    <h4>Execution Result:</h4>
                    <pre>{executionResult}</pre>
                </div>
            )}
        </div>
    );
};

export default FileEditor;
