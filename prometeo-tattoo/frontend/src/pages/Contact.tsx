import { useEffect } from 'react'
import { useConfigStore } from '../store/configStore'

export default function Contact() {
  useEffect(() => {
    document.title = 'Contacto — Prometeo Tattoo'
  }, [])

  const config = useConfigStore((s) => s.config)

  const phone = config['store_phone'] || '+54 9 11 3905-0618'
  const email = config['store_email'] || 'prometeo.tatto@gmail.com'
  const address = config['store_address'] || 'Arturo Jauretche 1001, B1686 Hurlingham'
  const instagram = config['instagram_url'] || 'https://www.instagram.com/prometeo.tattoo'

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10">
          <p className="font-mono text-gold/60 text-xs tracking-[0.3em] uppercase mb-2">
            Estamos para ayudarte
          </p>
          <h1 className="section-title">Contacto</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Form */}
          <div className="card-dark p-8">
            <h2 className="font-display tracking-widest text-xl mb-6 text-[#e8e8e8]">ENVIANOS UN MENSAJE</h2>
            <div className="space-y-4">
              <input type="text" className="input-field" placeholder="Tu nombre" disabled />
              <input type="email" className="input-field" placeholder="tu@email.com" disabled />
              <input type="text" className="input-field" placeholder="Asunto" disabled />
              <textarea className="input-field h-32 resize-none" placeholder="Tu mensaje..." disabled />
              <a
                href={`mailto:${email}`}
                className="btn-primary w-full flex items-center justify-center gap-2"
              >
                Escribinos por email
              </a>
              <a
                href={instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary w-full flex items-center justify-center gap-2"
              >
                Instagram — @prometeo.tattoo
              </a>
            </div>
          </div>

          {/* Info */}
          <div className="space-y-4">
            {[
              { icon: '📍', title: 'Dirección', value: address },
              { icon: '📞', title: 'Teléfono', value: phone },
              { icon: '📧', title: 'Email', value: email },
              { icon: '🕐', title: 'Horarios', value: 'Lun–Vie 9:00–18:00\nSáb 10:00–14:00' },
            ].map((item) => (
              <div key={item.title} className="card-dark p-5 flex gap-4">
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <h3 className="font-display tracking-widest text-gold text-sm">{item.title.toUpperCase()}</h3>
                  <p className="text-sm font-body text-[#e8e8e8]/60 mt-1 whitespace-pre-line">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
