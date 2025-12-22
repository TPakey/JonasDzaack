import Navigation from './components/Navigation';
import Hero from './sections/Hero';
import ProofStrip from './sections/ProofStrip';
import Projects from './sections/Projects';
import About from './sections/About';
import Contact from './sections/Contact';
import Footer from './sections/Footer';
import './styles/globals.css';

function App() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <Hero />
        <ProofStrip />
        <Projects />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
