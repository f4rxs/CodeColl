import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import projectService from '../services/projectService';
import '../styles/SideDashBoard.css';

const SideDashBoard = ({ userId }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await projectService.findProjectsByUser(userId);
        setProjects(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching projects');
        setLoading(false);
      }
    };

    if (userId) {
      fetchProjects();
    }
  }, [userId]);

  const filteredProjects = projects
    .filter((project) => !project.archived)
    .filter((project) => project?.project_name?.toLowerCase().includes(searchQuery.toLowerCase()));

  if (loading) {
    return <div>Loading projects...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="dashboard-sidebar">
      <div className="sidebar-content">
        <h2 className="projects-title">Projects</h2>
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Find a project..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <ul className="projects-list">
          {filteredProjects.map((project) => (
            <li key={project.id} className="project-item">
              <Link to={`/projects/${project.id}`} className="project-link">
                <div className="project-name">
                  /{project.project_name}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>

  );
};

export default SideDashBoard;
