import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Test from './components/Test';
import Navbar from './components/Navbar';
import About from './components/About';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import NotesState from './context/notes/NotesState';
function App() {
  return (
    <NotesState>
      <Router>
        <Navbar />
        <Alert message = {"This is fucking good application."}/>
        <div className="container my-5">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/test" element={<Test />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/signup' element={<Signup />} />
        </Routes>
        </div>
      </Router>
    </NotesState>
  );
}

export default App;
