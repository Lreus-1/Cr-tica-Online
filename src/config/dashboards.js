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
    nome: 'Crítica Online 3.0',
    descricao: 'Indicadores e análises em tempo real',
    icone: 'BarChart3',
    // Servidor da rede interna (http), não é Power BI: abre em nova aba.
    // Só funciona com o celular/computador na rede da empresa.
    externo: true,
    url: 'http://192.168.4.8:8060/#mobile',
    // Link antigo (Crítica Online 2.0, Power BI), caso precise voltar:
    // https://app.powerbi.com/view?r=eyJrIjoiZDYzODRkZDktOGUxNC00NTcyLTk4ZDMtYjMzMTEzZTRmZDhiIiwidCI6IjBiY2M1NWZiLWE3ZDktNDkxNi1iZjAyLWY2YzE0NDljOTg1MiJ9
  },
  {
    id: 'remuneracao',
    nome: 'Remuneração',
    descricao: 'Indicadores de remuneração e folha',
    icone: 'Wallet',
    url: 'https://app.powerbi.com/view?r=eyJrIjoiNTJjNTdhMTItMTAxZi00NDYwLWFjZDQtNDhmNGQyYjk2YTY4IiwidCI6IjBiY2M1NWZiLWE3ZDktNDkxNi1iZjAyLWY2YzE0NDljOTg1MiJ9',
  },

  {
    id: 'nao-compradores',
    nome: 'Não compradores',
    descricao: 'Clientes sem compra no período',
    icone: 'UserMinus',
    // Servidor da rede interna (http), não é Power BI: abre em nova aba.
    // Só funciona com o celular/computador na rede da empresa.
    externo: true,
    url: 'http://192.168.4.8:8060/#naocompradores',
  },
  {
    id: 'acompanhamento-tarefas',
    nome: 'Acompanhamento de Tarefas',
    descricao: 'Tarefas comerciais por cliente',
    icone: 'ListChecks',
    // Ferramenta própria (fora do Power BI): abre em nova aba.
    externo: true,
    url: 'https://acompanhamento-task.vercel.app/',
  },

  {
    id: 'minha-rota',
    nome: 'Minha rota',
    descricao: 'Sua rota do dia',
    icone: 'MapPin',
    // Servidor da rede interna (http), não é Power BI: abre em nova aba.
    // Só funciona com o celular/computador na rede da empresa.
    externo: true,
    url: 'http://192.168.4.8:8060/#rota',
  },

  {
    id: 'distribuicao-cerveja',
    nome: 'Distribuição de Cerveja',
    descricao: 'Distribuição da cesta de cervejas por cliente',
    icone: 'Beer',
    // Ferramenta própria (fora do Power BI): abre em nova aba.
    externo: true,
    url: 'https://precisely-separate-european-environments.trycloudflare.com',
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
