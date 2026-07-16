/**
 * Configuração centralizada de dashboards.
 *
 * Para adicionar um novo dashboard no futuro, basta acrescentar um novo
 * objeto neste array. A Home e a rota de visualização são geradas
 * automaticamente a partir desta lista — nenhum outro arquivo precisa
 * ser alterado.
 *
 * Campos:
 * - id:        slug único, usado na URL (/dashboard/:id)
 * - nome:      nome exibido no card e no cabeçalho da visualização
 * - descricao: texto curto exibido no card da Home
 * - icone:     nome de um ícone da biblioteca lucide-react (ex: "BarChart3")
 * - url:       link público gerado pelo Power BI em "Publicar na Web"
 */
export const dashboards = [
  {
    id: 'critica-online',
    nome: 'Crítica Online 2.0',
    descricao: 'Indicadores e análises em tempo real',
    icone: 'BarChart3',
    url: 'https://app.powerbi.com/view?r=eyJrIjoiMjkwYjM5NjEtZWExNC00ZDkxLTlmMWItZjg1NmE2MzgyYWRkIiwidCI6IjBiY2M1NWZiLWE3ZDktNDkxNi1iZjAyLWY2YzE0NDljOTg1MiJ9',
  },
  {
    id: 'remuneracao',
    nome: 'Remuneração',
    descricao: 'Indicadores de remuneração e folha',
    icone: 'Wallet',
    url: 'https://app.powerbi.com/view?r=eyJrIjoiNTJjNTdhMTItMTAxZi00NDYwLWFjZDQtNDhmNGQyYjk2YTY4IiwidCI6IjBiY2M1NWZiLWE3ZDktNDkxNi1iZjAyLWY2YzE0NDljOTg1MiJ9',
  },

  // Exemplo de como adicionar um novo dashboard futuramente:
  // {
  //   id: 'comercial',
  //   nome: 'Dashboard Comercial',
  //   descricao: 'Vendas, metas e performance comercial',
  //   icone: 'TrendingUp',
  //   url: 'https://app.powerbi.com/view?r=SEU_CODIGO_AQUI',
  // },
];

export function getDashboardById(id) {
  return dashboards.find((d) => d.id === id);
}
