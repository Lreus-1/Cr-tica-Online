# Crítica Online — Portal BI

Portal mobile para exibir dashboards do Power BI publicados via **Publicar na Web**, com visual de aplicativo, PWA instalável e arquitetura pronta para receber novos dashboards.

## Stack

- **React 18 + Vite** — build rápido, HMR, ecossistema simples de manter.
- **React Router** — navegação entre Home e a tela de cada dashboard.
- **lucide-react** — ícones, importados individualmente (não o pacote inteiro) para manter o bundle leve.
- **CSS puro** (sem Tailwind/UI kit) — o app tem poucos componentes; uma camada extra de dependência não se pagaria aqui.
- **Sem backend** — os dashboards são links públicos do Power BI; não há dado sensível para proteger no servidor.

Bundle final: ~176 KB JS (57 KB gzip) + 7 KB CSS.

## Rodando localmente

Pré-requisito: Node.js 18+.

```bash
npm install
npm run dev
```

Acesse `http://localhost:5173`.

## Gerando o build de produção

```bash
npm run build
npm run preview   # opcional: serve o build localmente para conferir
```

Os arquivos finais ficam em `dist/`.

## Publicando no GitHub

```bash
git init
git add .
git commit -m "Portal BI Crítica Online"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/critica-online-portal.git
git push -u origin main
```

## Publicando na Vercel

1. Acesse [vercel.com](https://vercel.com) e clique em **Add New → Project**.
2. Importe o repositório do GitHub criado acima.
3. A Vercel detecta automaticamente o framework **Vite** — mantenha:
   - Build Command: `vite build`
   - Output Directory: `dist`
4. Clique em **Deploy**.
5. O arquivo `vercel.json` já está configurado com um *rewrite* para que as rotas do React Router (`/dashboard/:id`) funcionem corretamente ao recarregar a página ou acessar o link direto.

### Atualizações futuras

Basta commitar e dar `git push` na branch conectada à Vercel — cada push gera um novo deploy automaticamente.

## Como adicionar um novo dashboard

Edite **apenas** o arquivo `src/config/dashboards.js` e acrescente um objeto ao array:

```javascript
{
  id: 'comercial',
  nome: 'Dashboard Comercial',
  descricao: 'Vendas, metas e performance comercial',
  icone: 'TrendingUp',
  url: 'https://app.powerbi.com/view?r=SEU_CODIGO_AQUI',
},
```

- `id` vira a URL: `/dashboard/comercial`.
- `icone` deve ser o nome de um ícone já registrado em `src/lib/icons.js`. Se quiser usar um ícone novo, importe-o de `lucide-react` nesse arquivo e adicione-o ao `iconMap`.

O card aparece automaticamente na Home — nenhum outro arquivo precisa ser tocado.

## Substituindo os ícones do PWA

Os ícones em `public/icons/` são placeholders gerados programaticamente (gráfico de barras sobre gradiente azul/teal, seguindo a paleta do app). Para usar a identidade visual real:

1. Gere os seguintes tamanhos com a logo definitiva: `192x192`, `512x512` e `180x180` (Apple touch icon), além das versões *maskable* (`icon-maskable-192.png`, `icon-maskable-512.png` — para maskable, deixe uma margem de segurança de ~20% ao redor do elemento principal, pois o Android pode recortar em círculo).
2. Substitua os arquivos em `public/icons/` mantendo os mesmos nomes.
3. Não é necessário alterar `manifest.webmanifest` se os nomes dos arquivos forem mantidos.

## Limitações conhecidas (Power BI via "Publicar na Web")

- **Segurança**: o link público não exige login — qualquer pessoa com a URL acessa o relatório. Não implemente autenticação apenas no frontend como forma de "proteger" esse conteúdo; isso não impede acesso direto ao link do Power BI. Se dados sensíveis precisarem de controle de acesso real, é necessário migrar para **Power BI Embedded** com autenticação via Azure AD, o que exige um backend para gerar tokens.
- **Responsividade interna**: o layout *dentro* do relatório é controlado pelo Power BI, não pelo portal. O app garante que o iframe ocupe todo o espaço disponível, mas a forma como visuais, filtros e tabelas se reorganizam dentro do relatório depende de como ele foi desenhado no Power BI Desktop.
- **Cross-origin**: por política do navegador, o portal não pode ler nem manipular o conteúdo dentro do iframe (não é possível, por exemplo, aplicar filtros externos ou saber em qual página do relatório o usuário está).
- **Detecção de erros**: o evento de carregamento do iframe dispara quando o documento do Power BI termina de carregar — mesmo que o relatório exiba um erro interno (link revogado, indisponibilidade). O portal detecta timeout de carregamento e falha de rede, mas não consegue inspecionar erros exibidos dentro do próprio relatório.
- **Sem controle sobre a UI interna**: barra de navegação de páginas, botão de exportar, filtros — tudo isso é renderizado pelo próprio Power BI e não pode ser estilizado pelo portal.

## Sugestões para evoluções futuras

- Migrar para **Power BI Embedded** caso seja necessário controle de acesso real por usuário/grupo.
- Adicionar um *splash screen* customizado para iOS (Apple exige imagens estáticas por resolução de tela).
- Cache de "últimos dashboards abertos" para acesso rápido na Home.
- Modo escuro/claro alternável (hoje o app é dark-first, alinhado ao uso de dashboards).
- Notificações push quando um indicador crítico mudar (exigiria backend).
