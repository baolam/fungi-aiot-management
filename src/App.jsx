import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavbarLayout from './components/NavbarLayout';
import Fungi from './pages/Fungi';
import Disease from './pages/Disease';
import Script from './pages/Script';
import NotFound from './pages/NotFound';
import About from './pages/About';
import HarvestOverview from './pages/HarvestOverview';
import HarvestImpor from './pages/HarvestImpor';

const App = () => {
  return (
    <>
      <Router>
        <NavbarLayout />
        <Routes>
          <Route path="/" element={<About />} />
          <Route path="/fungi" element={<Fungi />} />
          <Route path="/disease" element={<Disease />} />
          <Route path="/script" element={<Script />} />
          <Route path="/harvest" element={<HarvestOverview />} />
          <Route path="/harvest/:id" element={<HarvestImpor />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
