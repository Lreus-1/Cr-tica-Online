import { Link } from 'react-router-dom';
import { ChevronRight, BarChart3 } from 'lucide-react';
import { iconMap } from '../lib/icons.js';

export default function DashboardCard({ dashboard, index }) {
  const Icon = iconMap[dashboard.icone] || BarChart3;

  return (
    <Link
      to={`/dashboard/${dashboard.id}`}
      className="card"
      style={{ animationDelay: `${index * 80 + 120}ms` }}
    >
      <span className="card__sheen" aria-hidden="true" />
      <span className="card__icon">
        <Icon size={22} strokeWidth={2} />
      </span>
      <span className="card__body">
        <span className="card__title">{dashboard.nome}</span>
        <span className="card__desc">{dashboard.descricao}</span>
      </span>
      <ChevronRight className="card__chevron" size={20} strokeWidth={2} />
    </Link>
  );
}
