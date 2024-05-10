import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Landing from './routes/landing/landing';
import Confess from './routes/confess/confess';
import ConfessionRoute from './routes/confession/confession';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/layout';
import ScrollToTop from './components/layout/scroll_to_top';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <ScrollToTop />
    <Routes>
      <Route path='/' element={<Layout><Landing /></Layout>} />
      <Route path='/confess' element={<Layout><Confess /></Layout>} />
      <Route path='/confession/:id' element={<Layout><ConfessionRoute /></Layout>} />
    </Routes>
  </Router>
);
