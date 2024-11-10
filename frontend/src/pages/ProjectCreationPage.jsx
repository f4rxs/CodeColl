import React from "react";
import AppNavbar from "../components/NavBar";
import CreateProject from "../components/CreateProject";
const ProjectCreationPage = () => {

  const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
  const userId = loggedUser ? loggedUser.id : null;
  console.log(userId);
  
  
    return (
      <div>
        <AppNavbar userId={userId} /> {/* Render the Navbar */}
        <CreateProject userId={userId}/>
        
      </div>
  
       
    );
  };
  
  export default ProjectCreationPage;