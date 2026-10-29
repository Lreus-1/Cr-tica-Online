import { Component } from 'react';
import { AlertTriangle, RotateCw } from 'lucide-react';

/**
 * Rede de segurança: se algo quebrar ao desenhar uma tela, mostra um aviso
 * com botão de recarregar em vez de deixar a página inteira em branco.
 */
export default class ErrorBoundary extends Component {
  state = { erro: null };

  static getDerivedStateFromError(erro) {
    return { erro };
  }

  componentDidCatch(erro) {
    // Arquivo velho depois de uma atualização do portal: limpa o cache e
    // recarrega sozinho (uma vez). Ver o script de recuperação no index.html.
    const msg = String((erro && erro.message) || '');
    if (/dynamically imported module|module script failed|Loading chunk|Unexpected token '<'/i.test(msg)) {
      if (typeof window.__luviRecuperar === 'function') window.__luviRecuperar();
    }
  }

  render() {
    if (!this.state.erro) return this.props.children;

    return (
      <div className="app-erro" role="alert">
        <span className="app-erro__icone">
          <AlertTriangle size={20} strokeWidth={2} />
        </span>
        <h1 className="app-erro__titulo">Não foi possível abrir esta tela</h1>
        <p className="app-erro__msg">
          Pode ser uma atualização recente do portal. Recarregue a página para continuar.
        </p>
        <button className="error-state__btn" type="button" onClick={() => window.location.reload()}>
          <RotateCw size={14} strokeWidth={2} />
          Recarregar
        </button>
      </div>
    );
  }
}
