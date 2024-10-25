import React from 'react';
import { AppBar, Toolbar, Button, Container, Grid, Typography, Box } from '@mui/material';
import '../styles/MainPage.css';

function MainPage() {
  return (
    <div>
      {/* Navigation Bar */}
      <AppBar position="static" className="appBar">
        <div></div>
        <Toolbar className="toolbar">
          <Typography variant="h6">CodeColl</Typography>
          <div>
            <Button color="inherit" href="/signup">
              Sign Up
            </Button>
            <Button color="inherit" href="/login">
              Login
            </Button>
          </div>
        </Toolbar>
      </AppBar>

      {/* Welcome Section */}
      <Box sx={{ textAlign: 'center', py: 8, backgroundColor: '#ffffff' }}>
        <Container>
          <Typography variant="h2" component="h1" gutterBottom>
            Welcome to CodeColl
          </Typography>
          <Typography variant="h5" color="textSecondary" gutterBottom>
            Collaborate on code in real time, share files, and chat with your team.
          </Typography>
          <Button href="/signup" className="mainButton" size="large">
            Get Started
          </Button>
        </Container>
      </Box>

      {/* Features Section */}
      <Container className="section">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h4" component="h3">
              Real-time Collaboration
            </Typography>
            <Typography color="textSecondary">
              Edit code simultaneously with your team using our real-time editor.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h4" component="h3">
              Chat with Teammates
            </Typography>
            <Typography color="textSecondary">
              Stay connected with in-app chat while working on your projects.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h4" component="h3">
              Version Control
            </Typography>
            <Typography color="textSecondary">
              Track all your file changes and collaborate with ease.
            </Typography>
          </Grid>
        </Grid>
      </Container>

      {/* Footer */}
      <footer className="footer">
        <Typography>© 2024 CodeColl. All rights reserved.</Typography>
      </footer>
    </div>
  );
}

export default MainPage;
