import React, { useState } from 'react';
import Speech from './pages/Speech';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HeroHome from './components/HeroHome';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import About from './pages/About';
import Roadmap from './pages/Roadmap';
function App() {

  return (
    <BrowserRouter>
      <Navbar />
      <main className="">
        <Routes>
          <Route path="/" element={<HeroHome />} >
            <Route path="home" element={<HeroHome />} />
          </Route>
          <Route exact path="/app" element={<Speech />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/roadmap" element={<Roadmap />} />

        </Routes>
        <Footer />
      </main>
    </BrowserRouter>
  );
}

export default App;
