import { useEffect } from 'react'

export default function Contact() {
  useEffect(() => {
    document.title = 'Contacto — Prometeo Tattoo'
  }, [])

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
              <button className="btn-primary w-full" disabled>
                Enviar mensaje — Fase 4
              </button>
            </div>
          </div>

          {/* Info */}
          <div className="space-y-4">
            {[
              { icon: '📍', title: 'Dirección', value: 'Av. Corrientes 1234, Buenos Aires, Argentina' },
              { icon: '📞', title: 'Teléfono', value: '+54 11 1234-5678' },
              { icon: '📧', title: 'Email', value: 'hola@prometeo.tattoo' },
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
