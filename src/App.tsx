import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeroPortal from './sections/HeroPortal';
import Proof from './sections/Proof';
import ProjectsMotion from './sections/ProjectsMotion';
import About from './sections/About';
import Contact from './sections/Contact';
import Footer from './sections/Footer';
import './styles/globals.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      <main>
        <HeroPortal />
        <Proof />
        <ProjectsMotion />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
