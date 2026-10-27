import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { deliveryDashboards } from '../config/deliveryDashboards.js';
import DashboardCard from '../components/DashboardCard.jsx';
import LuviMark from '../components/LuviMark.jsx';
import OperacaoSelo from '../components/OperacaoSelo.jsx';

export default function Delivery() {
  return (
    <div className="home">
      <div className="home__aurora" aria-hidden="true">
        <span />
        <span />
      </div>

      <header className="home__header">
        <div className="home__brand">
          <Link to="/" className="dv-btn" aria-label="Voltar ao menu">
            <ArrowLeft size={17} strokeWidth={2} />
          </Link>
          <span className="home__mark">
            <LuviMark size={22} />
          </span>
          <div className="home__brand-text">
            <p className="home__name">LUVI BI</p>
            <p className="home__eyebrow">Entrega</p>
          </div>
          <OperacaoSelo />
        </div>

        <h1 className="home__title">Painéis</h1>
        <p className="home__subtitle">
          Selecione um painel para visualizar os indicadores atualizados.
        </p>
      </header>

      <div className="home__section-label">Disponíveis</div>

      <nav className="dash-list" role="list" aria-label="Lista de dashboards da entrega">
        {deliveryDashboards.map((dashboard, index) => (
          <DashboardCard key={dashboard.id} dashboard={dashboard} index={index} />
        ))}
      </nav>
    </div>
  );
}
