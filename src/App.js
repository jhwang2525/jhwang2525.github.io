import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Experience from './components/Experience';
import ShopifyWork from './components/ShopifyWork';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ChatAssistant from './components/ChatAssistant';
import Terminal from './components/Terminal';
import { useEffect, useState } from 'react';

function App() {
  const [terminalOpen, setTerminalOpen] = useState(false);

  // Press ~ (or `) anywhere outside a text field to open the terminal
  useEffect(() => {
    const onKey = (e) => {
      const typing = e.target.closest('input, textarea, select, [contenteditable="true"]');
      if (!typing && (e.key === '`' || e.key === '~')) {
        e.preventDefault();
        setTerminalOpen((o) => !o);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <Navbar onOpenTerminal={() => setTerminalOpen(true)} />
      <main>
        <Home />
        <About />
        <Experience />
        <ShopifyWork />
        <Projects />
        <Contact />
      </main>
      <Footer />
      <ChatAssistant />
      <Terminal open={terminalOpen} onClose={() => setTerminalOpen(false)} />
    </>
  );
}

export default App;
