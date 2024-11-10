import React from "react";
import AppNavbar from "../components/NavBar";
import MyProjects from "../components/MyProjects";
const ProfilePage = () => {

  const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
  const userId = loggedUser ? loggedUser.id : null;
  
  
    return (
      <div>
        <AppNavbar userId={userId} /> {/* Render the Navbar */}
        <MyProjects/>
      </div>
    );
  };
  
  export default ProfilePage;