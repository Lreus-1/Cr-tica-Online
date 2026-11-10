import SectorScreen from '../components/SectorScreen.jsx';
import { nivelServicoDashboards } from '../config/nivelServicoDashboards.js';

export default function ServiceLevel() {
  return <SectorScreen setor="Nível de Serviço" dashboards={nivelServicoDashboards} />;
}
