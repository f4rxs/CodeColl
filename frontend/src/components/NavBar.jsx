import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Dropdown, Container, Form, Button } from 'react-bootstrap';
import { FaEnvelope, FaUserCircle, FaBars, FaPlus } from 'react-icons/fa';
import invitationService from '../services/invitationService';
import defaultPfp from '../assests/defaultpfp.png';
import avatar from '../assests/avatar.png';
import '../styles/AppNavbar.css';

const AppNavbar = ({userId}) => {
    const [user, setUser] = useState(null);
    const [notifications, setNotifications] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));

   

    useEffect(() => {
        if (userId) {
            const fetchInvitations = async () => {
                try {
                    const response = await invitationService.findInvitationsByUser(userId);
                    setNotifications(response.data);
                } catch (error) {
                    console.error('Error fetching invitations', error);
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
        setSearchQuery(e.target.value);
    };

    const handleNewProject = () => {
        // Redirect to the page where users can create a new project
        // For now, we can just log something or add a route for the new project page.
        console.log('Create New Project clicked');
    };

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container className="d-flex align-items-center justify-content-between">
                {/* Left-aligned menu button */}
                <Dropdown align="start">
                    <Dropdown.Toggle as="button" className="menu-button">
                        <FaBars size={20} color="white" />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item href="#action/3.1">My Projects</Dropdown.Item>
                        <Dropdown.Item href="#action/3.2">Team Management</Dropdown.Item>
                        <Dropdown.Item href="#action/3.3">Settings</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>

                {/* Avatar as logo and Dashboard text */}
                <Navbar.Brand href="/" className="d-flex align-items-center">
                    <img
                        src={avatar} // Replace with your avatar image
                        alt="Logo"
                        className="avatar-logo"
                        style={{ width: '40px', height: '40px', marginRight: '10px' }}
                    />
                    <span className="dashboard-text">Dashboard</span>
                </Navbar.Brand>

                <Nav className="ml-auto d-flex align-items-center">
                    {/* Search Field */}
                    <Form inline className="mr-3">
                        <Form.Control
                            type="text"
                            placeholder="Search"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            className="search-input"
                        />
                    </Form>

                    {/* New Project Button */}
                    <Button
                        variant="success"
                        className="create-project-btn"
                        onClick={handleNewProject}
                    >
                        <FaPlus size={14} /> Create Project
                    </Button>

                    {/* Notification Icon */}
                    <Dropdown align="end">
                        <Dropdown.Toggle variant="link" id="dropdown-custom-components" className="notification-button">
                            <div className="notification-icon-wrapper">
                                <FaEnvelope color="white" size={24} />
                                {notifications.length > 0 && (
                                    <span className="notification-counter">
                                        {notifications.length}
                                    </span>
                                )}
                            </div>
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            {notifications.length === 0 ? (
                                <Dropdown.ItemText>No notifications</Dropdown.ItemText>
                            ) : (
                                notifications.map(notification => (
                                    <Dropdown.Item key={notification.id}>
                                        {notification.message}
                                        <div className="d-flex justify-content-between">
                                            <button
                                                className="btn btn-sm btn-success"
                                                onClick={() => handleNotificationClick(notification.id, 'accept')}
                                            >
                                                Accept
                                            </button>
                                            <button
                                                className="btn btn-sm btn-danger"
                                                onClick={() => handleNotificationClick(notification.id, 'reject')}
                                            >
                                                Reject
                                            </button>
                                        </div>
                                    </Dropdown.Item>
                                ))
                            )}
                        </Dropdown.Menu>
                    </Dropdown>

                    {/* Profile Icon */}
                    <Nav.Item>
                        <Nav.Link href="/profile">
                            {user ? (
                                <img
                                    src={user.profile_pic || defaultPfp}
                                    alt="Profile"
                                    className="profile-pic"
                                />
                            ) : (
                                <FaUserCircle color="white" size={30} />
                            )}
                        </Nav.Link>
                    </Nav.Item>
                </Nav>
            </Container>
        </Navbar>
    );
};

export default AppNavbar;
