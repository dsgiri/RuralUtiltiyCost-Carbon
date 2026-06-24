/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';
import { Footprint } from './pages/Footprint';
import { Enterprises } from './pages/Enterprises';
import { SoilCarbon } from './pages/SoilCarbon';
import { Benchmark } from './pages/Benchmark';
import { WhatIf } from './pages/WhatIf';
import { Mitigation } from './pages/Mitigation';
import { Favorites } from './pages/Favorites';
import { About } from './pages/SharedPages';
import { NotFound } from './pages/NotFound';
import { CookieBanner } from './components/layout/CookieBanner';

import { RouteTracker } from './components/layout/RouteTracker';

export default function App() {
  return (
    <Router>
      <RouteTracker />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/footprint" element={<Footprint />} />
          <Route path="/enterprises" element={<Enterprises />} />
          <Route path="/soil-carbon" element={<SoilCarbon />} />
          <Route path="/benchmark" element={<Benchmark />} />
          <Route path="/what-if" element={<WhatIf />} />
          <Route path="/mitigation" element={<Mitigation />} />
          <Route path="/favorites" element={<Favorites />} />
          
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
      <CookieBanner />
    </Router>
  );
}

