import { Link } from 'react-router-dom'

const columns = [
  {
    title: 'Categorías',
    links: [
      { label: 'Tintas', to: '/shop?category=tintas' },
      { label: 'Agujas', to: '/shop?category=agujas' },
      { label: 'Máquinas', to: '/shop?category=maquinas' },
      { label: 'Fuentes de poder', to: '/shop?category=fuentes-de-poder' },
      { label: 'Aftercare', to: '/shop?category=aftercare' },
    ],
  },
  {
    title: 'Empresa',
    links: [
      { label: 'Nosotros', to: '/about' },
      { label: 'Contacto', to: '/contact' },
      { label: 'Términos y Condiciones', to: '/terms' },
      { label: 'Política de Privacidad', to: '/privacy' },
    ],
  },
  {
    title: 'Soporte',
    links: [
      { label: 'FAQ', to: '/faq' },
      { label: 'Envíos', to: '/shipping' },
      { label: 'Devoluciones', to: '/returns' },
      { label: 'Garantía', to: '/warranty' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="font-display text-xl tracking-widest">
              <span className="text-accent">PROMETEO</span>
              <span className="text-[#e8e8e8]"> TATTOO</span>
            </Link>
            <p className="mt-3 text-sm text-[#e8e8e8]/40 font-body leading-relaxed">
              Insumos profesionales para tatuadores. Las mejores marcas del mercado.
            </p>
            {/* Social links */}
            <div className="flex gap-3 mt-4">
              <a
                href="https://www.instagram.com/prometeo.tattoo"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded border border-border flex items-center justify-center text-[#e8e8e8]/40 hover:text-accent hover:border-accent transition-colors text-xs font-mono uppercase"
              >
                ig
              </a>
            </div>
          </div>

          {/* Columns */}
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="font-display tracking-widest text-gold text-sm mb-4 uppercase">
                {col.title}
              </h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-sm font-body text-[#e8e8e8]/40 hover:text-[#e8e8e8] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs font-mono text-[#e8e8e8]/30 uppercase tracking-widest">
            © {new Date().getFullYear()} Prometeo Tattoo — Todos los derechos reservados
          </p>
          <p className="text-xs font-mono text-[#e8e8e8]/20 tracking-wide">
            React + TypeScript + Node.js + Docker
          </p>
        </div>
      </div>
    </footer>
  )
}
