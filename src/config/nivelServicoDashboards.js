/**
 * Painéis da área Nível de Serviço (sem senha).
 *
 * Mesmo padrão de src/config/dashboards.js — para adicionar um novo
 * painel aqui, basta acrescentar um objeto ao array.
 */
export const nivelServicoDashboards = [
  {
    id: 'acompanhamento-nivel-servico',
    nome: 'Acompanhamento de Nível de Serviço',
    descricao: 'Indicadores do nível de serviço',
    icone: 'Gauge',
    // Ferramenta própria (fora do Power BI): abre em nova aba.
    externo: true,
    url: 'https://ns.luvibi.com.br/',
  },
];
