import { Link } from 'react-router-dom';
import { Truck, Briefcase, ShieldCheck, Landmark, UsersRound, TrendingUp, ArrowRight } from 'lucide-react';
import LuviMark from '../components/LuviMark.jsx';
import OperacaoSelo from '../components/OperacaoSelo.jsx';

export default function Menu() {
  return (
    <div className="menu">
      <div className="home__aurora" aria-hidden="true">
        <span />
        <span />
      </div>

      <header className="menu__header">
        <span className="home__mark">
          <LuviMark size={26} />
        </span>
        <div className="home__brand-text">
          <p className="home__name">LUVI BI</p>
          <p className="home__eyebrow">Portal de indicadores</p>
        </div>
          <OperacaoSelo />
      </header>

      <div className="menu__intro">
        <h1 className="menu__title">Qual é o seu setor?</h1>
        <p className="menu__subtitle">Escolha uma opção para continuar.</p>
      </div>

      <div className="menu__options">
        <Link to="/entrega" className="menu-option">
          <span className="menu-option__icon">
            <Truck size={26} strokeWidth={1.75} />
          </span>
          <span className="menu-option__label">Entrega</span>
          <ArrowRight className="menu-option__arrow" size={18} strokeWidth={2} />
        </Link>

        <Link to="/comercial" className="menu-option">
          <span className="menu-option__icon">
            <Briefcase size={26} strokeWidth={1.75} />
          </span>
          <span className="menu-option__label">Comercial</span>
          <ArrowRight className="menu-option__arrow" size={18} strokeWidth={2} />
        </Link>

        <Link to="/seguranca" className="menu-option">
          <span className="menu-option__icon">
            <ShieldCheck size={26} strokeWidth={1.75} />
          </span>
          <span className="menu-option__label">Segurança</span>
          <ArrowRight className="menu-option__arrow" size={18} strokeWidth={2} />
        </Link>

        <Link to="/financeiro" className="menu-option">
          <span className="menu-option__icon">
            <Landmark size={26} strokeWidth={1.75} />
          </span>
          <span className="menu-option__label">Financeiro</span>
          <ArrowRight className="menu-option__arrow" size={18} strokeWidth={2} />
        </Link>

        <Link to="/gente-e-gestao" className="menu-option">
          <span className="menu-option__icon">
            <UsersRound size={26} strokeWidth={1.75} />
          </span>
          <span className="menu-option__label">Gente e Gestão</span>
          <ArrowRight className="menu-option__arrow" size={18} strokeWidth={2} />
        </Link>

        <Link to="/gestao-comercial" className="menu-option">
          <span className="menu-option__icon">
            <TrendingUp size={26} strokeWidth={1.75} />
          </span>
          <span className="menu-option__label">Gestão Comercial</span>
          <ArrowRight className="menu-option__arrow" size={18} strokeWidth={2} />
        </Link>
      </div>
    </div>
  );
}
