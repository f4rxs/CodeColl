import React, { useState, useEffect } from "react";
import AppNavbar from "../components/NavBar";
import { Link } from "react-router-dom";
import projectCollaboratorService from "../services/projectCollaboratorService";
import activityService from "../services/activitylogService";
import userService from "../services/userSerivce";
import '../styles/UserPage.css';

const UserPage = () => {
  const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
  const userId = loggedUser ? loggedUser.id : null;

  const [searchQuery, setSearchQuery] = useState("");
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [activities, setActivities] = useState([]);
  const [loadingActivities, setLoadingActivities] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await projectCollaboratorService.getUserProjectsController(userId);
        setProjects(response.data);
        setLoading(false);
      } catch (err) {
        setError("Error fetching projects");
        setLoading(false);
      }
    };

    if (userId) {
      fetchProjects();
    }
  }, [userId]);

  useEffect(() => {
    const fetchActivities = async () => {
      if (!selectedProjectId) return;
      try {
        setLoadingActivities(true);
        const response = await activityService.findActivitiesByProject(selectedProjectId);
        setActivities(response.data.activities);
        setLoadingActivities(false);
      } catch (err) {
        setActivities([]);
        setLoadingActivities(false);
      }
    };

    fetchActivities();
  }, [selectedProjectId]);

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
    <div className="user-page">
      <AppNavbar userId={userId} />
      <div className="dashboard-container">
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
                    <div className="project-name">/{project.project_name}</div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="activity-log-container">
          <h2 className="activity-title">Activity Log</h2>

          <div className="project-dropdown">
            <label htmlFor="project-select">Select a project: </label>
            <select
              id="project-select"
              onChange={(e) => setSelectedProjectId(e.target.value)}
              value={selectedProjectId || ''}
            >
              <option value="" disabled>Select a project</option>
              {filteredProjects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.project_name}
                </option>
              ))}
            </select>
          </div>

          {loadingActivities && <div>Loading activities...</div>}
          {activities.length === 0 && !loadingActivities && selectedProjectId ? (
            <div>No activity found for this project. Choose another one.</div>
          ) : (
            activities.length === 0 && !loadingActivities && !selectedProjectId && (
              <div>Choose a project to view activity logs.</div>
            )
          )}

          <ul className="activity-list">
            {activities.map((activity) => (
              <li key={activity.id} className="activity-item">
                <div className="activity-description">
                  <span className="activity-username">{activity.username}</span>: {activity.action}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserPage;