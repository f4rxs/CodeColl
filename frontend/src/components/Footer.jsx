import React from 'react';
import '../styles/Footer.css';
import { Container } from 'react-bootstrap';

const Footer = () => (
  <footer className="footer">
    <Container>
      <p>&copy; {new Date().getFullYear()} CodeCollab. All rights reserved.</p>
      <div className="social-links">
        <a href="https://twitter.com/codecollab">Twitter</a>
        <a href="https://linkedin.com/company/codecollab">LinkedIn</a>
      </div>
    </Container>
  </footer>
);

export default Footer;