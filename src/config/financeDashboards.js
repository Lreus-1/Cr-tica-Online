/**
 * Painéis exclusivos da área Financeiro.
 *
 * Mesmo padrão de src/config/dashboards.js — para adicionar um novo
 * painel aqui, basta acrescentar um objeto ao array.
 */
export const financeDashboards = [
  {
    id: 'acompanhamento-cobranca',
    nome: 'Acompanhamento Cobrança',
    descricao: 'Acompanhamento de cobrança',
    icone: 'HandCoins',
    // Servidor da rede interna (http), não é Power BI: abre em nova aba.
    // Só funciona com o celular/computador na rede da empresa.
    externo: true,
    url: 'http://192.168.4.128:8096/',
  },
];
