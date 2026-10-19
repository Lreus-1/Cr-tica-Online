import { Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import Menu from './pages/Menu.jsx';
import Home from './pages/Home.jsx';
import Delivery from './pages/Delivery.jsx';
import Security from './pages/Security.jsx';
import Finance from './pages/Finance.jsx';
import People from './pages/People.jsx';
import PinGate from './components/PinGate.jsx';
import DashboardView from './pages/DashboardView.jsx';
import Gallery from './pages/Gallery.jsx';

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/comercial" element={<Home />} />
        <Route path="/entrega" element={<Delivery />} />
        <Route
          path="/seguranca"
          element={
            <PinGate setor="seguranca" nome="Segurança">
              <Security />
            </PinGate>
          }
        />
        <Route
          path="/financeiro"
          element={
            <PinGate setor="financeiro" nome="Financeiro">
              <Finance />
            </PinGate>
          }
        />
        <Route
          path="/gente-e-gestao"
          element={
            <PinGate setor="gente-e-gestao" nome="Gente e Gestão">
              <People />
            </PinGate>
          }
        />
        <Route path="/dashboard/:id" element={<DashboardView />} />
        <Route path="/acervo" element={<Gallery />} />
        <Route path="*" element={<Menu />} />
      </Routes>
      <Analytics />
    </>
  );
}
