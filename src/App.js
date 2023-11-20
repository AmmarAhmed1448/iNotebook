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
import { useState } from 'react';


function App() {

  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    });
    setTimeout(() => {
      setAlert(null);
    }, 9000);
  }
  return (

    <NotesState>
      <Router>
        <Navbar />
        {alert && <Alert alert={alert} />}
        <div className="container my-5">
        <Routes>
          <Route exact path="/" element={<Home showAlert={showAlert} />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/test" element={<Test />} />
          <Route exact path='/login' element={<Login showAlert={showAlert} />} />
          <Route exact path='/signup' element={<Signup showAlert={showAlert} />} />
        </Routes>
        </div>
      </Router>
    </NotesState>
  );
}

export default App;
