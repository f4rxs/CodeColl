import React, { useState, useEffect, useRef } from 'react';
import { Navbar, Nav, Dropdown, Container, Form } from 'react-bootstrap';
import { FaEnvelope, FaUserCircle, FaBars, FaPlus } from 'react-icons/fa';
import invitationService from '../services/invitationService';
import userService from '../services/userSerivce';
import projectService from '../services/projectService';
import defaultPfp from '../assests/defaultpfp.png';
import avatar from '../assests/avatarC.png';
import { useNavigate } from 'react-router-dom';
import '../styles/AppNavbar.css';

const AppNavbar = ({ userId }) => {
    const [user, setUser] = useState(null);
    const [notifications, setNotifications] = useState([]);  
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState({ users: [], projects: [] });
    const dropdownRef = useRef(null);
    const navigate = useNavigate();
    const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));

    useEffect(() => {
        if (loggedUser && loggedUser.id && !user) { 
            const fetchUserData = async () => {
                try {
                    const response = await userService.getUserById(loggedUser.id); 
                    setUser(response.data);
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            };
            fetchUserData();
        }
    }, [loggedUser, user]);

    const navigateToProfile = (profileUserId) => {
        navigate(`/profile/${profileUserId}`, {
            state: { showEditButton: profileUserId === loggedUser.id }
        });
    };

    const navigateToProject = (projectId) => {
        navigate(`/projects/${projectId}`);
    };

    useEffect(() => {
        if (userId) {
            const fetchInvitations = async () => {
                try {
                    const response = await invitationService.findInvitationForUser(userId);
                    setNotifications(Array.isArray(response.data) ? response.data : []); 
                } catch (error) {
                    console.error('Error fetching invitations:', error);
                    setNotifications([]);
                }
            };
            fetchInvitations();
        }
    }, [userId]);

    const handleNotificationClick = async (notificationId, response) => {
        try {
            await invitationService.respondToInvitation(notificationId, response);
            setNotifications(notifications.filter(notification => notification.id !== notificationId));
        } catch (error) {
            console.error('Error responding to invitation', error);
        }
    };

    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        if (query.trim() === '') {
            setSearchResults({ users: [], projects: [] }); // Clear results if query is empty
        }
    };

    const handleSearchSubmit = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;

        try {
            const userPromise = userService.searchUserByUsername(searchQuery);
            const projectPromise = projectService.searchProjects(searchQuery);

            const [userResponse, projectResponse] = await Promise.allSettled([userPromise, projectPromise]);

            setSearchResults({
                users: userResponse.status === 'fulfilled' ? userResponse.value.data : [],
                projects: projectResponse.status === 'fulfilled' ? projectResponse.value.data : []
            });
        } catch (error) {
            console.error('Error searching', error);
        }
    };

    const handleNewProject = () => {
        navigate('/create-project');
    };

    // Close dropdown if clicking outside or if searchQuery is empty
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setSearchResults({ users: [], projects: [] });
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container className="d-flex align-items-center justify-content-between">
                <Dropdown align="start">
                    <Dropdown.Toggle as="button" className="menu-button">
                        <FaBars size={20} color="white" />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => navigate('/my-projects')}>My Projects</Dropdown.Item>
                        <Dropdown.Item href="#action/3.2">Team Management</Dropdown.Item>
                        <Dropdown.Item href="#action/3.3">Settings</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>

                <Navbar.Brand className="d-flex align-items-center" onClick={() => navigate(`/home`)}>
                    <img src={avatar} alt="Logo" className="avatar-logo" style={{ width: '40px', height: '40px', marginRight: '10px' }} />
                    <span className="dashboard-text">Dashboard</span>
                </Navbar.Brand>

                <Nav className="ml-auto d-flex align-items-center">
                    <Form inline className="mr-3" onSubmit={handleSearchSubmit}>
                        <Form.Control
                            type="text"
                            placeholder="Search"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            className="search-input"
                        />
                    </Form>

                    <div variant="success" className="create-project" onClick={handleNewProject}>
                        <FaPlus size={14} /> Create Project
                    </div>

                    <Dropdown align="end">
                        <Dropdown.Toggle variant="link" id="dropdown-custom-components" className="notification-button-btn">
                            <div className="notification-icon-wrapper">
                                <FaEnvelope color="white" size={20} />
                                {Array.isArray(notifications) && notifications.length > 0 && (
                                    <span className="notification-counter">
                                        {notifications.length}
                                    </span>
                                )}
                            </div>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {Array.isArray(notifications) && notifications.length === 0 ? (
                                <Dropdown.ItemText>No notifications</Dropdown.ItemText>
                            ) : (
                                notifications.map(notification => (
                                    <Dropdown.Item key={notification.id}>
                                        {notification.message}
                                        <div className="d-flex justify-content-between">
                                            <button
                                                className="btn btn-sm btn-success"
                                                onClick={() => handleNotificationClick(notification.id, 'accepted')}
                                            >
                                                Accept
                                            </button>
                                            <button
                                                className="btn btn-sm btn-danger"
                                                onClick={() => handleNotificationClick(notification.id, 'rejected')}
                                            >
                                                Reject
                                            </button>
                                        </div>
                                    </Dropdown.Item>
                                ))
                            )}
                        </Dropdown.Menu>
                    </Dropdown>

                    <Nav.Item>
                        <Nav.Link onClick={() => navigateToProfile(loggedUser.id)}>
                            {user ? (
                                <img src={user.profile_pic || defaultPfp} alt="Profile" className="profile-pic" />
                            ) : (
                                <FaUserCircle color="white" size={30} />
                            )}
                        </Nav.Link>
                    </Nav.Item>
                </Nav>
            </Container>

            {/* Search Results Dropdown */}
            {(searchResults.users.length > 0 || searchResults.projects.length > 0) && (
                <div ref={dropdownRef} className="search-results">
                    {searchResults.users.length > 0 && (
                        <div>
                            <h6>Users</h6>
                            <ul>
                                {searchResults.users.map((user) => (
                                    <li key={user.id} onClick={() => navigateToProfile(user.id)}>
                                        {user.username} <small>(User)</small>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    {searchResults.projects.length > 0 && (
                        <div>
                            <h6>Projects</h6>
                            <ul>
                                {searchResults.projects.map((project) => (
                                    <li key={project.id} onClick={() => navigateToProject(project.id)}>
                                        {project.project_name} <small>(Project)</small>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            )}
        </Navbar>
    );
};

export default AppNavbar;
