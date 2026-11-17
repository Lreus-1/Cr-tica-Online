import { Link } from 'react-router-dom';
import { Truck, Briefcase, ShieldCheck, Landmark, UsersRound, TrendingUp, Gauge, ArrowRight, Lock } from 'lucide-react';
import LuviMark from '../components/LuviMark.jsx';
import OperacaoSelo from '../components/OperacaoSelo.jsx';
import { sectorPins } from '../config/access.js';
import { dashboards } from '../config/dashboards.js';
import { deliveryDashboards } from '../config/deliveryDashboards.js';
import { securityDashboards } from '../config/securityDashboards.js';
import { financeDashboards } from '../config/financeDashboards.js';
import { peopleDashboards } from '../config/peopleDashboards.js';
import { gestaoComercialDashboards } from '../config/gestaoComercialDashboards.js';
import { nivelServicoDashboards } from '../config/nivelServicoDashboards.js';

// Um setor por linha. A contagem de painéis e o cadeado vêm da própria
// configuração (nada digitado à mão), então acompanham o que for adicionado.
const setores = [
  { to: '/entrega', rotulo: 'Entrega', icone: Truck, lista: deliveryDashboards },
  { to: '/comercial', rotulo: 'Comercial', icone: Briefcase, lista: dashboards },
  { to: '/seguranca', rotulo: 'Segurança', icone: ShieldCheck, lista: securityDashboards, pin: 'seguranca' },
  { to: '/financeiro', rotulo: 'Financeiro', icone: Landmark, lista: financeDashboards, pin: 'financeiro' },
  { to: '/gente-e-gestao', rotulo: 'Gente e Gestão', icone: UsersRound, lista: peopleDashboards, pin: 'gente-e-gestao' },
  { to: '/gestao-comercial', rotulo: 'Gestão Comercial', icone: TrendingUp, lista: gestaoComercialDashboards, pin: 'gestao-comercial' },
  { to: '/nivel-de-servico', rotulo: 'Nível de Serviço', icone: Gauge, lista: nivelServicoDashboards },
];

const contar = (n) => (n === 1 ? '1 painel' : `${n} painéis`);

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

      {/* Texts reveal (transitions.dev): título e apoio sobem com desfoque, em sequência. */}
      <div className="menu__intro t-stagger is-shown">
        <h1 className="menu__title t-stagger-line t-stagger-line--1">Qual é o seu setor?</h1>
        <p className="menu__subtitle t-stagger-line t-stagger-line--2">Escolha uma opção para continuar.</p>
      </div>

      <nav className="menu__options" aria-label="Setores">
        {setores.map(({ to, rotulo, icone: Icone, lista, pin }, i) => (
          <Link key={to} to={to} className="menu-option" style={{ '--i': i }}>
            <span className="menu-option__icon">
              <Icone size={24} strokeWidth={1.75} />
            </span>
            <span className="menu-option__text">
              <span className="menu-option__label">{rotulo}</span>
              <span className="menu-option__meta">
                {pin && sectorPins[pin] && <Lock size={11} strokeWidth={2.25} aria-label="Acesso com senha" />}
                {contar(lista.length)}
              </span>
            </span>
            <ArrowRight className="menu-option__arrow" size={18} strokeWidth={2} />
          </Link>
        ))}
      </nav>
    </div>
  );
}
