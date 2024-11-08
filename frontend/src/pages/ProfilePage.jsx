import React from "react";
import AppNavbar from "../components/NavBar";
import  ProfileMain from "../components/Profile";
const ProfilePage = () => {

  const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
  const userId = loggedUser ? loggedUser.id : null;
  console.log(userId);
  
  
    return (
      <div>
        <AppNavbar userId={userId} /> {/* Render the Navbar */}
        <ProfileMain/>
      </div>
    );
  };
  
  export default ProfilePage;