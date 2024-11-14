import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import projectCollaboratorService from '../services/projectCollaboratorService';
import { Button, Form, Spinner } from 'react-bootstrap';

const CollaboratorProfilePage = () => {
    const { userId } = useParams(); 
    const location = useLocation();
    const projectId = location.state?.projectId; 
    const [collaborator, setCollaborator] = useState(null);
    const [permissions, setPermissions] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCollaborator = async () => {
            try {
                setLoading(true);
                const response = await projectCollaboratorService.findCollaboratorsByProject(projectId);
                
                // Find the specific collaborator by userId
                const targetCollaborator = response.data.collaborators.find(collab => collab.user_id === parseInt(userId));
                
                if (!targetCollaborator) throw new Error("Collaborator not found.");

                setCollaborator(targetCollaborator);
                setPermissions(targetCollaborator.permissions || {});
                setLoading(false);
            } catch (error) {
                console.error("Error fetching collaborator details:", error);
                setError("Error fetching collaborator details. Please try again.");
                setLoading(false);
            }
        };

        if (projectId) fetchCollaborator();
    }, [userId, projectId]);

    const handlePermissionChange = (permission) => {
        setPermissions((prev) => ({ ...prev, [permission]: !prev[permission] }));
    };

    const handleSavePermissions = async () => {
        try {
            await projectCollaboratorService.updateCollaboratorPermissions(projectId, userId, permissions);
            alert("Permissions updated successfully!");
            navigate(`/project/${projectId}`);
        } catch (error) {
            console.error("Failed to update permissions:", error);
            alert("Failed to update permissions. Please try again.");
        }
    };

    if (loading) return <Spinner animation="border" role="status">Loading...</Spinner>;
    if (error) return <p>{error}</p>;

    return (
        <div className="collaborator-profile">
            <h2>Manage Permissions for {collaborator.user.username}</h2>
            <Form>
                {Object.keys(permissions).map((permission) => (
                    <Form.Check 
                        key={permission}
                        type="checkbox"
                        label={permission.replace(/_/g, ' ')}
                        checked={permissions[permission]}
                        onChange={() => handlePermissionChange(permission)}
                    />
                ))}
                <Button onClick={handleSavePermissions} variant="primary" className="mt-3">
                    Save Permissions
                </Button>
            </Form>
        </div>
    );
};

export default CollaboratorProfilePage;
