import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import DashboardCard from './DashboardCard.jsx';
import LuviMark from './LuviMark.jsx';
import OperacaoSelo from './OperacaoSelo.jsx';

/**
 * Tela de um setor: cabeçalho com o nome do setor + lista de painéis.
 * Usada pelas telas Financeiro e Gente e Gestão.
 */
export default function SectorScreen({ setor, dashboards }) {
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
            <p className="home__eyebrow">{setor}</p>
          </div>
          <OperacaoSelo />
        </div>

        <h1 className="home__title">Painéis</h1>
        <p className="home__subtitle">
          Selecione um painel para visualizar os indicadores atualizados.
        </p>
      </header>

      <div className="home__section-label">Disponíveis</div>

      <nav className="dash-list" role="list" aria-label={`Lista de painéis de ${setor}`}>
        {dashboards.map((dashboard, index) => (
          <DashboardCard key={dashboard.id} dashboard={dashboard} index={index} />
        ))}
      </nav>
    </div>
  );
}
