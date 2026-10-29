import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import Menu from './pages/Menu.jsx';
import Home from './pages/Home.jsx';
import Delivery from './pages/Delivery.jsx';
import Security from './pages/Security.jsx';
import Finance from './pages/Finance.jsx';
import People from './pages/People.jsx';
import CommercialManagement from './pages/CommercialManagement.jsx';
import PinGate from './components/PinGate.jsx';
import FundoOperacao from './components/FundoOperacao.jsx';
import DashboardView from './pages/DashboardView.jsx';
// A galeria (com a lista de imagens) só é baixada quando a pessoa abre o acervo.
const Gallery = lazy(() => import('./pages/Gallery.jsx'));

export default function App() {
  return (
    <>
      <FundoOperacao />
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/comercial" element={<Home />} />
        <Route path="/entrega" element={<Delivery />} />
        <Route
          path="/seguranca"
          element={
            <PinGate key="seguranca" setor="seguranca" nome="Segurança">
              <Security />
            </PinGate>
          }
        />
        <Route
          path="/financeiro"
          element={
            <PinGate key="financeiro" setor="financeiro" nome="Financeiro">
              <Finance />
            </PinGate>
          }
        />
        <Route
          path="/gente-e-gestao"
          element={
            <PinGate key="gente-e-gestao" setor="gente-e-gestao" nome="Gente e Gestão">
              <People />
            </PinGate>
          }
        />
        <Route
          path="/gestao-comercial"
          element={
            <PinGate key="gestao-comercial" setor="gestao-comercial" nome="Gestão Comercial">
              <CommercialManagement />
            </PinGate>
          }
        />
        <Route path="/dashboard/:id" element={<DashboardView />} />
        <Route
          path="/acervo"
          element={
            <Suspense fallback={<div className="app-carregando" aria-busy="true" />}>
              <Gallery />
            </Suspense>
          }
        />
        <Route path="*" element={<Menu />} />
      </Routes>
      <Analytics />
    </>
  );
}
