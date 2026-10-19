import SectorScreen from '../components/SectorScreen.jsx';
import { financeDashboards } from '../config/financeDashboards.js';

export default function Finance() {
  return <SectorScreen setor="Financeiro" dashboards={financeDashboards} />;
}
