import React from "react";
import { Container } from "react-bootstrap";
import ScrollAnimation from "../components/animation/ScrollAnimation";
import { fadeInUp } from "../components/animation/animation"; 
import '../styles/AboutSection.css';

const AboutSection = () => (
    <section className="about">
        <ScrollAnimation variants={fadeInUp}>
            <Container>
                <h2 className="text-center">About CodeCollab</h2>
                <p>
                    CodeCollab is designed to make team collaboration on coding projects seamless and efficient. Our tools, powered by AI, enhance productivity and help teams work smarter together.
                </p>
            </Container>
        </ScrollAnimation>
    </section>
);

export default AboutSection;
