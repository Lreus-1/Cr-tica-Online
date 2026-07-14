import { BarChart3 } from 'lucide-react';
import { dashboards } from '../config/dashboards.js';
import DashboardCard from '../components/DashboardCard.jsx';

export default function Home() {
  return (
    <div className="home">
      <span className="home__glow home__glow--a" aria-hidden="true" />
      <span className="home__glow home__glow--b" aria-hidden="true" />

      <header className="home__header">
        <div className="home__brand">
          <span className="home__logo">
            <BarChart3 size={22} strokeWidth={2.2} />
          </span>
          <div>
            <p className="home__eyebrow">Portal BI</p>
            <h1 className="home__name">Crítica Online</h1>
          </div>
        </div>
        <p className="home__greeting">
          Seus indicadores, sempre à mão. Escolha um dashboard abaixo.
        </p>

        <svg
          className="home__pulse"
          viewBox="0 0 320 46"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            className="home__pulse-track"
            d="M0,30 C30,30 34,10 54,10 C74,10 78,36 100,36 C122,36 126,6 150,6 C174,6 178,32 202,32 C226,32 230,16 254,16 C278,16 282,26 320,26"
          />
          <path
            className="home__pulse-line"
            d="M0,30 C30,30 34,10 54,10 C74,10 78,36 100,36 C122,36 126,6 150,6 C174,6 178,32 202,32 C226,32 230,16 254,16 C278,16 282,26 320,26"
          />
        </svg>
      </header>

      <main className="home__list" role="list">
        {dashboards.map((dashboard, index) => (
          <DashboardCard key={dashboard.id} dashboard={dashboard} index={index} />
        ))}
      </main>

      <footer className="home__footer">
        <span className="home__footer-dot" />
        Dados via Power BI
      </footer>
    </div>
  );
}
