import { Link } from 'react-router-dom';
import { ChevronRight, BarChart3 } from 'lucide-react';
import { iconMap } from '../lib/icons.js';
import BorderBeam from './BorderBeam.jsx';
import { externalLinkProps } from '../lib/externalLink.js';

export default function DashboardCard({ dashboard, index }) {
  const Icon = iconMap[dashboard.icone] || BarChart3;
  // Cada card gira numa velocidade diferente, pra não parecerem
  // "sincronizados" quando há mais de um na lista.
  const beamDuration = 6 + index * 3.5;

  const content = (
    <>
      <BorderBeam radius={18} duration={beamDuration} />
      <span className="dash-row__icon">
        <Icon size={18} strokeWidth={1.75} />
      </span>
      <span className="dash-row__body">
        <span className="dash-row__title">{dashboard.nome}</span>
        <span className="dash-row__desc">{dashboard.descricao}</span>
      </span>
      <ChevronRight className="dash-row__chevron" size={17} strokeWidth={2} />
    </>
  );

  // Painéis marcados como `externo` (páginas próprias, fora do Power BI)
  // abrem em nova aba em vez de dentro do visualizador.
  if (dashboard.externo) {
    return (
      <a
        {...externalLinkProps(dashboard.url)}
        className="dash-row"
        role="listitem"
        style={{ animationDelay: `${index * 45}ms` }}
      >
        {content}
      </a>
    );
  }

  return (
    <Link
      to={`/dashboard/${dashboard.id}`}
      className="dash-row"
      role="listitem"
      style={{ animationDelay: `${index * 45}ms` }}
    >
      {content}
    </Link>
  );
}
