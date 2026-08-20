import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Download } from 'lucide-react';
import { galleryTitleOverrides } from '../config/gallery.js';

// O Vite importa automaticamente qualquer imagem desta pasta — não é
// preciso listar os arquivos em lugar nenhum. Basta soltar um novo
// arquivo em src/assets/artes/ e, no próximo build/deploy, ele já
// aparece aqui sozinho.
const modules = import.meta.glob('/src/assets/artes/*.{png,jpg,jpeg,webp,gif}', {
  eager: true,
  import: 'default',
});

function toTitleCase(name) {
  return name.replace(/[-_]+/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

const galleryItems = Object.entries(modules)
  .map(([path, url]) => {
    const filename = path.split('/').pop();
    const base = filename.replace(/\.[^.]+$/, '');
    const ext = filename.split('.').pop();
    const titulo = galleryTitleOverrides[base] || toTitleCase(base);
    return { id: base, titulo, url, downloadName: `${titulo}.${ext}` };
  })
  .sort((a, b) => a.titulo.localeCompare(b.titulo, 'pt-BR'));

function GalleryItem({ item }) {
  const [dims, setDims] = useState(null);

  return (
    <div className="gallery-item">
      <div className="gallery-item__thumb">
        <img
          src={item.url}
          alt={item.titulo}
          loading="lazy"
          onLoad={(e) => setDims(`${e.target.naturalWidth} × ${e.target.naturalHeight}`)}
        />
      </div>
      <div className="gallery-item__info">
        <div className="gallery-item__text">
          <p className="gallery-item__name">{item.titulo}</p>
          <p className="gallery-item__format">{dims || '—'}</p>
        </div>
        <a
          href={item.url}
          download={item.downloadName}
          className="gallery-item__download"
          aria-label={`Baixar ${item.titulo}`}
        >
          <Download size={16} strokeWidth={2} />
        </a>
      </div>
    </div>
  );
}

export default function Gallery() {
  return (
    <div className="gallery">
      <header className="gallery__header">
        <Link to="/" className="dv-btn" aria-label="Voltar">
          <ArrowLeft size={17} strokeWidth={2} />
        </Link>
        <div className="gallery__title-group">
          <h1 className="gallery__title">Acervo de artes</h1>
          <span className="gallery__badge">{galleryItems.length} arquivos</span>
        </div>
      </header>

      <main className="gallery__grid">
        {galleryItems.map((item) => (
          <GalleryItem item={item} key={item.id} />
        ))}

        {galleryItems.length === 0 && (
          <p className="gallery__empty">Nenhuma arte disponível no momento.</p>
        )}
      </main>
    </div>
  );
}
