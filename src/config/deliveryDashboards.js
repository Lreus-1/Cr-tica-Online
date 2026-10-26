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
    // Servidor da rede interna (http), não é Power BI: abre em nova aba.
    // Só funciona com o celular/computador na rede da empresa.
    externo: true,
    url: 'http://192.168.4.128:8090/',
  },
];

export function getDeliveryDashboardById(id) {
  return deliveryDashboards.find((d) => d.id === id);
}
