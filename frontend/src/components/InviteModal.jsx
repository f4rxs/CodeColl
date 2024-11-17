import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import userService from '../services/userSerivce';
import invitationService from '../services/invitationService'; 
import '../styles/InviteModal.css';

const InviteModal = ({ show, onClose, projectId, ownerName, projectTitle }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [invitationMessage, setInvitationMessage] = useState(`You're invited to collaborate on ${projectTitle}`);

    const handleSearchChange = async (e) => {
        setSearchTerm(e.target.value);
        if (e.target.value) {
            try {
                const response = await userService.searchUserByUsername(e.target.value);
                setSearchResults(response.data);
            } catch (error) {
                console.error('Error searching users:', error);
            }
        } else {
            setSearchResults([]);
        }
    };

    const handleUserSelect = (user) => {
        setSelectedUser(user);
        setSearchResults([]);
        setSearchTerm(user.username);
    };

    const handleSendInvitation = async () => {
        if (selectedUser) {
            try {
               await invitationService.sendInvitation(
                    selectedUser.id,  
                    projectId,         
                    invitationMessage  
                );
    
                alert('Invitation sent successfully!');
                onClose(); // closing modal after sending
            } catch (error) {
                console.error('Error sending invitation:', error);
                alert('Failed to send invitation.');
            }
        }
    };

    return (
        <Modal show={show} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Invite a Collaborator</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="searchUser">
                        <Form.Label>Search User</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter username"
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                        <ul className="search-results">
                            {searchResults.map((user) => (
                                <li key={user.id} onClick={() => handleUserSelect(user)}>
                                    {user.username}
                                </li>
                            ))}
                        </ul>
                    </Form.Group>

                    <Form.Group controlId="invitationMessage">
                        <Form.Label>Invitation Message</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            value={invitationMessage}
                            onChange={(e) => setInvitationMessage(e.target.value)}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={handleSendInvitation} disabled={!selectedUser}>
                    Send Invitation
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default InviteModal;
