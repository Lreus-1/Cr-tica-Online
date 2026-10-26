import SectorScreen from '../components/SectorScreen.jsx';
import { gestaoComercialDashboards } from '../config/gestaoComercialDashboards.js';

export default function CommercialManagement() {
  return <SectorScreen setor="Gestão Comercial" dashboards={gestaoComercialDashboards} />;
}
