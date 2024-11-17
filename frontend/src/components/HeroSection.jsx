import React from "react";
import '../styles/HeroSection.css';
import { Button } from "react-bootstrap";
import ideImage from '../assests/ideDarkImage.png'; 
import jsImage from '../assests/langauges/js.png';
import javaImage from '../assests/langauges/java.png'
import pythonImage from '../assests/langauges/python.png';
import cImage from '../assests/langauges/C.png';
import cPlusImage from '../assests/langauges/C++.png'
import rubyImage  from '../assests/langauges/Ruby.png'
import goImage from '../assests/langauges/Go.png';
import phpImage from '../assests/langauges/php.png';
import htmlImage from '../assests/langauges/html.png';
import cssImage from '../assests/langauges/css.png';
import tsImage from '../assests/langauges/TS.png';


const languages = [
    { name: "JavaScript", icon: jsImage },
    { name: "Python", icon: pythonImage },
    {name:"Java",icon:javaImage},
    {name:"C",icon:cImage},
    {name:"C++",icon:cPlusImage},
    {name:"Ruby",icon:rubyImage},
    {name:"Go",icon:goImage},
    {name:"php",icon:phpImage},
    {name:"html",icon:htmlImage},
    {name:"css",icon:cssImage},
    {name:"type script",icon:tsImage}
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
                    <h2>Code in many languages</h2>
                    <p>
                        CodeColl supports many programming languages. Several ship in the box, like JavaScript,
                        TypeScript, html...
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