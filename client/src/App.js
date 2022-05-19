import React from 'react'
import './App.css';
import Navbar from './components/layout/Navbar'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './components/pages/Home'
import About from './components/pages/About'
import ContactState from './components/context/contact/ContactState'

const App = () => {
  return (
    <ContactState>
    <Router>
     <div className="App">
      <Navbar />
      <div className="container">
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/about' element={<About />} />
        </Routes>
      </div>
     </div>
    </Router>
    </ContactState>    
  )
}

export default App;
