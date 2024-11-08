import React from 'react';
import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeaturesSection';
import AboutSection from '../components/AboutSection';
import Footer from '../components/Footer';
import CustomNavbar from '../components/CustomNavbar';
import '../styles/MainPage.css';
import FadeIn from "../components/animation/FadeIn";

const MainPage = () => {
  return (
    <FadeIn>
      <div className="main-page">
        <CustomNavbar />
        <HeroSection />
        <FeaturesSection />
        <AboutSection />
        <Footer />
      </div>
    </FadeIn>

  );
};

export default MainPage;