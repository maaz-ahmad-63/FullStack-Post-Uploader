import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import UploadPage from './UploadPage';
import ViewPage from './ViewPage';

function App() {
  return (
    <Router>
      <nav style={{marginBottom: 20}}>
        <Link to="/" style={{marginRight: 10}}>Upload</Link>
        <Link to="/view">View</Link>
      </nav>
      <Routes>
        <Route path="/" element={<UploadPage />} />
        <Route path="/view" element={<ViewPage />} />
      </Routes>
    </Router>
  );
}

export default App;
