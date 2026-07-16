import { Link } from 'react-router-dom';
import { ChevronRight, BarChart3 } from 'lucide-react';
import { iconMap } from '../lib/icons.js';
import BorderBeam from './BorderBeam.jsx';

export default function DashboardCard({ dashboard, index }) {
  const Icon = iconMap[dashboard.icone] || BarChart3;
  // Cada card gira numa velocidade diferente, pra não parecerem
  // "sincronizados" quando há mais de um na lista.
  const beamDuration = 6 + index * 3.5;

  return (
    <Link
      to={`/dashboard/${dashboard.id}`}
      className="dash-row"
      role="listitem"
      style={{ animationDelay: `${index * 45}ms` }}
    >
      <BorderBeam radius={18} duration={beamDuration} />
      <span className="dash-row__icon">
        <Icon size={18} strokeWidth={1.75} />
      </span>
      <span className="dash-row__body">
        <span className="dash-row__title">{dashboard.nome}</span>
        <span className="dash-row__desc">{dashboard.descricao}</span>
      </span>
      <ChevronRight className="dash-row__chevron" size={17} strokeWidth={2} />
    </Link>
  );
}
