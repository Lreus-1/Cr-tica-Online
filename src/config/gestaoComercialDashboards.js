/**
 * Painéis exclusivos da área Gestão Comercial (acesso com senha).
 *
 * Mesmo padrão de src/config/dashboards.js — para adicionar um novo
 * painel aqui, basta acrescentar um objeto ao array.
 */
export const gestaoComercialDashboards = [
  {
    id: 'quedas',
    nome: 'Quedas',
    descricao: 'Acompanhamento de quedas',
    icone: 'TrendingDown',
    // Ferramenta própria (fora do Power BI): abre em nova aba.
    externo: true,
    url: 'https://acompanhamento-quedas-five.vercel.app/',
  },
  {
    id: 'analise-contratos',
    nome: 'Análise dos contratos',
    descricao: 'Indicadores dos contratos',
    icone: 'FileText',
    url: 'https://app.powerbi.com/view?r=eyJrIjoiMTQzOWI1NTMtMDRkMy00MGFkLTg4NzctNDk1NTJmODFlYzU0IiwidCI6IjBiY2M1NWZiLWE3ZDktNDkxNi1iZjAyLWY2YzE0NDljOTg1MiJ9',
  },
];

export function getGestaoComercialDashboardById(id) {
  return gestaoComercialDashboards.find((d) => d.id === id);
}
