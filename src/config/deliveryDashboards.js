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
    descricao: 'Remuneração de motoristas e ajudantes',
    icone: 'Truck',
    // Página própria (com login), não é Power BI: abre em nova aba.
    externo: true,
    url: 'https://leather-upgrade-anthony-herbal.trycloudflare.com',
  },
];

export function getDeliveryDashboardById(id) {
  return deliveryDashboards.find((d) => d.id === id);
}
