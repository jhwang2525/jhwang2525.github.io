import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Experience from './components/Experience';
import ShopifyWork from './components/ShopifyWork';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Home />
        <About />
        <Experience />
        <ShopifyWork />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
