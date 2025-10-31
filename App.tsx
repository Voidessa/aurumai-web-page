import React, { useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Program from './components/Program';
import Showcase from './components/Showcase';
import HowItWorks from './components/HowItWorks';
import Testimonials from './components/Testimonials';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';

function App() {
  useEffect(() => {
    // This function captures UTM parameters from the URL and saves them to localStorage.
    const captureUTMParameters = () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const utm = {
          source: urlParams.get('utm_source'),
          medium: urlParams.get('utm_medium'),
          campaign: urlParams.get('utm_campaign'),
          content: urlParams.get('utm_content'),
          term: urlParams.get('utm_term')
        };
        // Only save to localStorage if at least one UTM parameter is present.
        if (Object.values(utm).some(param => param !== null)) {
          localStorage.setItem('utm', JSON.stringify(utm));
        }
      } catch (error) {
        console.error("Error capturing UTM parameters:", error);
      }
    };

    captureUTMParameters();
  }, []); // The empty dependency array ensures this runs only once on component mount.

  return (
    <div className="bg-bg text-fg font-sans">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-28">
        <Hero />
        <Features />
        <Program />
        <Showcase />
        <HowItWorks />
        <Testimonials />
        <Pricing />
        <FAQ />
      </main>
      <FinalCTA />
      <Footer />
    </div>
  );
}

export default App;
