/**
 * Painéis exclusivos da área de Entrega (motoristas).
 *
 * Mesmo padrão de src/config/dashboards.js — para adicionar um novo
 * painel aqui, basta acrescentar um objeto ao array. Fica separado dos
 * painéis do Comercial de propósito, já que são públicos diferentes.
 */
export const deliveryDashboards = [
  {
    id: 'painel-motorista',
    nome: 'Remuneração Entrega',
    descricao: 'Indicadores da rota e das entregas',
    icone: 'Truck',
    url: 'https://app.powerbi.com/view?r=eyJrIjoiMmZmYWU0MTItMDA4ZS00YzMwLWExNzctOWY2YWYwNzZiNmI3IiwidCI6IjBiY2M1NWZiLWE3ZDktNDkxNi1iZjAyLWY2YzE0NDljOTg1MiJ9',
  },
];

export function getDeliveryDashboardById(id) {
  return deliveryDashboards.find((d) => d.id === id);
}
