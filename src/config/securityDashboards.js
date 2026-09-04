/**
 * Painéis exclusivos da área de Segurança.
 *
 * Mesmo padrão de src/config/dashboards.js — para adicionar um novo
 * painel aqui, basta acrescentar um objeto ao array.
 */
export const securityDashboards = [
  {
    id: 'prontuario-condutor-dpo',
    nome: 'Prontuário Condutor DPO',
    descricao: 'Registro e conformidade dos condutores',
    icone: 'BookUser',
    url: 'https://app.powerbi.com/view?r=eyJrIjoiNzBkMzEzMTUtMGI3NC00ZmZiLWI1YTAtOTlkYmJlYTVmZDk0IiwidCI6IjBiY2M1NWZiLWE3ZDktNDkxNi1iZjAyLWY2YzE0NDljOTg1MiJ9',
  },
];

export function getSecurityDashboardById(id) {
  return securityDashboards.find((d) => d.id === id);
}
