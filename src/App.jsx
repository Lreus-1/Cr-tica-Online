import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import DashboardView from './pages/DashboardView.jsx';
import Gallery from './pages/Gallery.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard/:id" element={<DashboardView />} />
      <Route path="/acervo" element={<Gallery />} />
      <Route path="*" element={<Home />} />
    </Routes>
  );
}
