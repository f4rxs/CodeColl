import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaUsers, FaCode, FaHistory } from 'react-icons/fa';
import ScrollAnimation from "../components/animation/ScrollAnimation";
import { fadeInUp } from "../components/animation/animation";

const features = [
    { title: 'Real-Time Collaboration', description: 'Work on code with your team in real time.', icon: <FaUsers size={50} /> },
    { title: 'AI Code Suggestions', description: 'Get AI-powered suggestions and code fixes.', icon: <FaCode size={50} /> },
    { title: 'Version Control', description: 'Keep track of every change with seamless version control.', icon: <FaHistory size={50} /> }
];

const FeaturesSection = () => (
    <section className="features">
      <Container>
        <ScrollAnimation variants={fadeInUp}>
          <h2 className="text-center">Features</h2>
        </ScrollAnimation>
        <Row className="features-list">
          {features.map((feature, index) => (
            <Col md={4} key={index} className="feature-item text-center">
              <ScrollAnimation variants={fadeInUp}>
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </ScrollAnimation>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
);

export default FeaturesSection;
