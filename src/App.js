import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar';
import About from './components/About';
import NotesState from './context/notes/NotesState';
function App() {
  return (
    <NotesState>
      <Router>
        <Navbar />
        <div className="container my-5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
        </div>
      </Router>
    </NotesState>
  );
}

export default App;
