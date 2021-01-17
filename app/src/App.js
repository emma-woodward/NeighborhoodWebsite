import './Styling.css';
import Navbar from './Components/Navbar'
import React from 'react';
import {AuthProvider} from './Contexts/AuthContext';

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
