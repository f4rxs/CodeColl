import React, { useState } from "react";
import AppNavbar from "../components/NavBar";
import SideDashBoard from "../components/SideDashboard";
const UserPage = () => {

  const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
  const userId = loggedUser ? loggedUser.id : null;
  console.log(userId);
  
  

    return (
      <div>
        <AppNavbar userId={userId} /> {/* Render the Navbar */}
        <SideDashBoard userId={userId} />
        
      </div>
  
       
    );
  };
  
  export default UserPage;