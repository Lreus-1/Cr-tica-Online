/**
 * Props para links que abrem em outra aba/navegador.
 *
 * É o mesmo comportamento do botão "abrir em nova aba" do cabeçalho dos
 * painéis: um link comum com target="_blank". Fica num lugar só pra, se
 * for preciso mudar o jeito de abrir no futuro, mudar aqui vale pra todos.
 */
export function externalLinkProps(url) {
  return { href: url, target: '_blank', rel: 'noopener noreferrer' };
}
