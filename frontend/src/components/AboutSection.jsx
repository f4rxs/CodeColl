import React from "react";
import '../styles/AboutSection.css'
import { Container } from "react-bootstrap"; // Import Container from Bootstrap

const AboutSection = () => {
    return (
        <section className="about">
            <Container>
                <h2 className="text-center">About CodeCollab</h2>
                <p>CodeCollab is designed to make team collaboration on coding projects seamless and efficient. Our tools, powered by AI, enhance productivity and help teams work smarter together.</p>
            </Container>
        </section>
    );
}

export default AboutSection;