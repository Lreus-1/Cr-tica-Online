import SectorScreen from '../components/SectorScreen.jsx';
import { peopleDashboards } from '../config/peopleDashboards.js';

export default function People() {
  return <SectorScreen setor="Gente e Gestão" dashboards={peopleDashboards} />;
}
