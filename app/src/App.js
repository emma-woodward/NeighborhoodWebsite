import './Styling.css';
import Navbar from './Components/Navbar'
import React, {useState, useEffect} from 'react';
import { AuthProvider } from './Contexts/AuthContext';

function App() {

  return (
    <AuthProvider>
      <div className="Styling">
        <Navbar />
      </div>
    </AuthProvider>
  );
}

export default App;
