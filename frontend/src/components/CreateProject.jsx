import React, { useState } from 'react';
import projectService from '../services/projectService'; 
import '../styles/CreateProject.css';

const CreateProject = ({ userId }) => {
    const [projectName, setProjectName] = useState('');
    const [projectDescription, setProjectDescription] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const projectData = {
            owner_id: userId,
            project_name: projectName,
            description: projectDescription
        };

        try {
            const response = await projectService.createProject(projectData);
            setSuccessMessage(`Project '${response.data.project.project_name}' created successfully!`);
            setProjectName('');
            setProjectDescription('');
            setError('');
        } catch (err) {
            setError(`Error creating project: ${err.message}`);
        }
    };

    return (
        <div className="create-project-page">
            <h2>Create New Project</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Project Name</label>
                    <input
                        type="text"
                        className="form-control"
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Project Description</label>
                    <textarea
                        className="form-control"
                        value={projectDescription}
                        onChange={(e) => setProjectDescription(e.target.value)}
                    ></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Create Project</button>
            </form>
            
            {error && <div className="alert alert-danger mt-3">{error}</div>}
            {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}
        </div>
    );
};

export default CreateProject;
