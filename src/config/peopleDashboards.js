/**
 * Painéis exclusivos da área Gente e Gestão.
 *
 * Mesmo padrão de src/config/dashboards.js — para adicionar um novo
 * painel aqui, basta acrescentar um objeto ao array.
 */
export const peopleDashboards = [
  {
    id: 'acompanhamento-absenteismo',
    nome: 'Acompanhamento de Absenteísmo',
    descricao: 'Indicadores de ausências da equipe',
    icone: 'UserX',
    url: 'https://app.powerbi.com/view?r=eyJrIjoiYTkyOGNhOWEtNjI2NS00YmQzLTk3YTAtZjA2NzlkMGZlYzNlIiwidCI6IjBiY2M1NWZiLWE3ZDktNDkxNi1iZjAyLWY2YzE0NDljOTg1MiJ9',
  },
];

export function getPeopleDashboardById(id) {
  return peopleDashboards.find((d) => d.id === id);
}
