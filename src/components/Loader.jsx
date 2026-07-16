export default function Loader({ nome, mensagem = 'Carregando indicadores...' }) {
  return (
    <div className="loader">
      <span className="loader__bar-track" aria-hidden="true">
        <span className="loader__bar-fill" />
      </span>
      <span className="loader__spinner" aria-hidden="true" />
      <div className="loader__text">
        <p className="loader__title">{nome}</p>
        <p className="loader__msg">{mensagem}</p>
      </div>
    </div>
  );
}
