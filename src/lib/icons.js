/**
 * Registro central de ícones usados nos cards de dashboard.
 *
 * Importamos apenas os ícones que efetivamente usamos (em vez de
 * `import * as Icons from 'lucide-react'`) para manter o bundle leve —
 * o pacote completo de ícones adiciona centenas de KB desnecessários.
 *
 * Ao adicionar um novo dashboard em `config/dashboards.js` com um
 * `icone` novo, importe o ícone correspondente aqui e adicione-o ao mapa.
 */
import {
  BarChart3,
  TrendingUp,
  Users,
  ShieldCheck,
  Target,
  Trophy,
  Activity,
  Wallet,
} from 'lucide-react';

export const iconMap = {
  BarChart3,
  TrendingUp,
  Users,
  ShieldCheck,
  Target,
  Trophy,
  Activity,
  Wallet,
};
