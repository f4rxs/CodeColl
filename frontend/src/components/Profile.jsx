import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Image, Button, Form } from 'react-bootstrap';
import { LockFill, PencilSquare } from 'react-bootstrap-icons';
import defaultPfp from '../assests/defaultpfp.png';
import '../styles/ProfilePage.css';
import userService from '../services/userSerivce';

const allowedSkills = ['JavaScript', 'Java', 'C++', 'Python', 'Ruby', 'Go', 'C#'];

const ProfilePage = ({ showEditButton, userId }) => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [newBio, setNewBio] = useState('');
  const [newSkills, setNewSkills] = useState([]);
  const [newProfilePic, setNewProfilePic] = useState('');
  const [profilePicFile, setProfilePicFile] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        if(userId){
          const profile = await userService.getUserById(userId);
          setUser(profile.data);
          setNewBio(profile.data.bio || '');
          setNewSkills(profile.data.skills || []);
          setNewProfilePic(profile.data.profile_pic || defaultPfp);
        } else {
          const storedUser = JSON.parse(localStorage.getItem('loggedUser'));
          if (storedUser) {
            setUser(storedUser);
            setNewBio(storedUser.bio || '');
            setNewSkills(storedUser.skills || []);
            setNewProfilePic(storedUser.profile_pic || defaultPfp);
          }
        }
      } catch (error) {
        console.error("Failed to load user profile:", error);
      }
    };

    fetchUserProfile();
  }, [userId]);

  const handleEditProfileClick = () => setEditMode(!editMode);
  const handleBioChange = (e) => setNewBio(e.target.value);

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicFile(file);
      setNewProfilePic(URL.createObjectURL(file)); 
    }
  };

  const handleSaveChanges = async () => {
    try {
      const currentUserId = user.id;
      await userService.updateUserBio(currentUserId, newBio);
      await userService.updateUserSkills(currentUserId, newSkills);

      if (profilePicFile) {
        await userService.updateUserProfilePic(currentUserId, profilePicFile);
    }

      const updatedUser = {
        ...user,
        bio: newBio,
        skills: newSkills,
        profile_pic: newProfilePic,
      };

      setUser(updatedUser);
      localStorage.setItem('loggedUser', JSON.stringify(updatedUser));
      setEditMode(false);
    } catch (error) {
      console.error("Failed to save changes:", error);
    }
  };

  const handleAddSkill = (e) => {
    const skill = e.target.value;
    if (skill && !newSkills.includes(skill)) {
      setNewSkills([...newSkills, skill]);
    }
  };

  const handleRemoveSkill = (index) => setNewSkills(newSkills.filter((_, i) => i !== index));

  if (!user) {
    return <p className="loading-text">Loading profile...</p>;
  }

  return (
    <Container fluid className="profile-page-container">
      <Row className="justify-content-center">
        <Col md={6} className="text-center">
          <div className="profile-pic-container">
            <Image src={newProfilePic} roundedCircle alt="Profile Picture" className="profile-pic-prof" />
            {editMode && (
              <>
                <PencilSquare className="edit-icon" />
                <Form.Group>
                  <Form.Label>Change Profile Picture</Form.Label>
                  <Form.Control type="file" accept="image/*" onChange={handleProfilePicChange} />
                </Form.Group>
              </>
            )}
          </div>
          <h2 className="profile-name">{user.username || "Username"}</h2>
          <div className="bio-container">
            {editMode ? (
              <Form.Control as="textarea" rows={3} value={newBio} onChange={handleBioChange} className="edit-input" />
            ) : (
              <p className="profile-bio">{newBio || "This user has no bio."}</p>
            )}
          </div>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md={6} className="skills-section">
          <h3>Skills</h3>
          {editMode ? (
            <>
              <Form.Group>
                <Form.Label>Add a Skill</Form.Label>
                <Form.Control as="select" onChange={handleAddSkill} defaultValue="">
                  <option value="" disabled>Select a skill</option>
                  {allowedSkills.map((skill, index) => (
                    <option key={index} value={skill}>{skill}</option>
                  ))}
                </Form.Control>
              </Form.Group>
              <ul className="skills-list">
                {newSkills.map((skill, index) => (
                  <li key={index}>
                    {skill}
                    <Button variant="danger" onClick={() => handleRemoveSkill(index)} size="sm">
                      Remove
                    </Button>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <ul className="skills-list">
              {newSkills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          )}
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md={6} className="text-center">
          {editMode ? (
            <>
              <Button variant="success" onClick={handleSaveChanges}>Save Changes</Button>
              <Button variant="secondary" onClick={() => setEditMode(false)}>Cancel</Button>
            </>
          ) : (
            showEditButton && (
              <Button className='edit-button' variant="primary" onClick={handleEditProfileClick}>Edit Profile</Button>
            )
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ProfilePage;
