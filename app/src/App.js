import './Styling.css';
import Navbar from './Components/Navbar'
import React from 'react';
import {AuthProvider} from './Contexts/AuthContext';

function App() {

  return (
    <div className="Styling">
      <Navbar />
    </div>
  );
}

export default App;
