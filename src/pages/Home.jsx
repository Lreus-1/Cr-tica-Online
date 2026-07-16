import { dashboards } from '../config/dashboards.js';
import DashboardCard from '../components/DashboardCard.jsx';
import LuviMark from '../components/LuviMark.jsx';

export default function Home() {
  return (
    <div className="home">
      <div className="home__aurora" aria-hidden="true">
        <span />
        <span />
      </div>

      <header className="home__header">
        <div className="home__brand">
          <span className="home__mark">
            <LuviMark size={22} />
          </span>
          <div className="home__brand-text">
            <p className="home__name">LUVI BI</p>
            <p className="home__eyebrow">Portal de indicadores</p>
          </div>
        </div>

        <h1 className="home__title">Painéis</h1>
        <p className="home__subtitle">
          Selecione um painel para visualizar os indicadores atualizados.
        </p>
      </header>

      <div className="home__section-label">
        Disponíveis
        <svg className="home__trend" viewBox="0 0 46 16" aria-hidden="true">
          <path className="home__trend-line" d="M2,13 L15,9 L28,9.5 L42,3" />
          <circle className="home__trend-dot" cx="2" cy="13" r="2.2" />
          <circle className="home__trend-dot" cx="15" cy="9" r="2.2" />
          <circle className="home__trend-dot" cx="28" cy="9.5" r="2.2" />
          <circle className="home__trend-dot" cx="42" cy="3" r="2.2" />
        </svg>
      </div>

      <nav className="dash-list" role="list" aria-label="Lista de dashboards">
        {dashboards.map((dashboard, index) => (
          <DashboardCard key={dashboard.id} dashboard={dashboard} index={index} />
        ))}
      </nav>

      <footer className="home__footer">
        <span className="home__footer-tag">POWER BI</span>
        Conteúdo renderizado a partir de relatórios publicados na web.
      </footer>
    </div>
  );
}
