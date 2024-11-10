import React from "react";
import '../styles/HeroSection.css';
import { Button } from "react-bootstrap";
import ideImage from '../assests/ideDarkImage.png'; // Ensure this path is correct
import jsImage from '../assests/langauges/js.png';
// import tsImage from '../../src/assests/langauges/ts.png';
import javaImage from '../assests/langauges/java.png'
import pythonImage from '../assests/langauges/python.png';

// Import all other language images similarly...


const languages = [
    { name: "JavaScript", icon: jsImage },
    // { name: "TypeScript", icon: tsImage },
    { name: "Python", icon: pythonImage },
    {name:"Java",icon:javaImage}
    // Continue adding other languages here...
];

const HeroSection = () => {
    return (
        <section className="hero swimlane copilot row">
            {/* IDE Intro Section */}
            <div className="col-sm-6 col-lg-4">
                <div className="value-prop-intro">
                    <h2>Code with an online IDE</h2>
                    <p>Code within a real-time IDE while collaborating.</p>
                    <Button variant="primary" className="hero-button">Learn More</Button>
                </div>
                <div className="secondary-value-prop">
                    <p>Present suggestions automatically to help you code more efficiently.</p>
                </div>
                <div className="secondary-value-prop">
                    <p>Understand the context of your code, workspace, and more.</p>
                </div>
            </div>
            <div className="col-sm-6 col-lg-8">
                <img id="ide" className="swimlane-image" src={ideImage} loading="lazy" alt="IDE illustration" />
            </div>

            {/* Supported Languages Section */}
            <div className="swimlane row languages-section">
                <div className="col-sm-6 col-lg-4">
                    <h2>Code in any language</h2>
                    <p>
                        VS Code supports almost every major programming language. Several ship in the box, like JavaScript,
                        TypeScript, CSS, and HTML, but extensions for others can be found in the VS Code Marketplace.
                    </p>
                </div>
                <div className="languages col-sm-6 col-lg-8">
                    {languages.map((language) => (
                        <div key={language.name} className="language-item">
                            <img src={language.icon} alt={`${language.name} icon`} className="language-icon" />
                            <code>{language.name}</code>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HeroSection;