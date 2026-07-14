export default function Loader({ nome, mensagem = 'Carregando indicadores...' }) {
  return (
    <div className="loader">
      <div className="loader__pulse" aria-hidden="true">
        <span className="loader__ring loader__ring--1" />
        <span className="loader__ring loader__ring--2" />
        <span className="loader__bars">
          <span className="loader__bar" />
          <span className="loader__bar" />
          <span className="loader__bar" />
        </span>
      </div>
      <p className="loader__title">{nome}</p>
      <p className="loader__msg">{mensagem}</p>
    </div>
  );
}
