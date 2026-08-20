/**
 * Overrides opcionais de título para as artes do acervo.
 *
 * O app detecta sozinho qualquer imagem colocada em
 * `src/assets/artes/` — não é preciso listar nada manualmente. Um
 * título já é gerado automaticamente a partir do nome do arquivo (ex:
 * "post-feed-01.png" vira "Post Feed 01").
 *
 * Use este arquivo só se quiser um título mais bonito do que o gerado
 * automaticamente. A chave é o nome do arquivo, sem extensão, exatamente
 * como está salvo em src/assets/artes/.
 */
export const galleryTitleOverrides = {
  'post-feed-01': 'Post para feed',
  'story-01': 'Arte para stories',
};
