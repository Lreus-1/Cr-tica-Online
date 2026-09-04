import { Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import Menu from './pages/Menu.jsx';
import Home from './pages/Home.jsx';
import Delivery from './pages/Delivery.jsx';
import Security from './pages/Security.jsx';
import DashboardView from './pages/DashboardView.jsx';
import Gallery from './pages/Gallery.jsx';

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/comercial" element={<Home />} />
        <Route path="/entrega" element={<Delivery />} />
        <Route path="/seguranca" element={<Security />} />
        <Route path="/dashboard/:id" element={<DashboardView />} />
        <Route path="/acervo" element={<Gallery />} />
        <Route path="*" element={<Menu />} />
      </Routes>
      <Analytics />
    </>
  );
}
