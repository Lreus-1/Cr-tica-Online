import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Botão "voltar" que nunca deixa a pessoa presa.
 *
 * Se existe uma tela anterior dentro do app, volta nela (navigate(-1)).
 * Se a página foi aberta direto pelo endereço (link salvo, atalho, F5 num
 * painel), não existe tela anterior: nesse caso vai para `fallback`.
 * O react-router guarda a posição do histórico em history.state.idx
 * (0 = primeira tela aberta no app).
 */
export function useBack(fallback = '/') {
  const navigate = useNavigate();

  return useCallback(() => {
    const idx =
      window.history.state && typeof window.history.state.idx === 'number'
        ? window.history.state.idx
        : 0;

    if (idx > 0) navigate(-1);
    else navigate(fallback, { replace: true });
  }, [navigate, fallback]);
}
