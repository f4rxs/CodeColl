// ProfilePage.js
import React from "react";
import AppNavbar from "../components/NavBar";
import ProfileMain from "../components/Profile";
import { useLocation, useParams } from "react-router-dom";

const ProfilePage = () => {
  const {userId} = useParams(); 
  const location = useLocation();
  const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
  
  const currentUserId = loggedUser ? loggedUser.id : null;

  const showEditButton = currentUserId && currentUserId.toString() === userId;

  return (
    <div>
      <AppNavbar userId={currentUserId} /> {/* Render the Navbar */}
      <ProfileMain showEditButton={showEditButton} userId={userId} />
    </div>
  );
};

export default ProfilePage;
