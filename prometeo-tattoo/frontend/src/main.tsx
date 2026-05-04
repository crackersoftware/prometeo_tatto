import React, { type ReactNode } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles/globals.css'

interface ErrorBoundaryState {
  hasError: boolean
}

class ErrorBoundary extends React.Component<{ children: ReactNode }, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: Error) {
    console.error('[ErrorBoundary]', error)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0a0a' }}>
          <div style={{ textAlign: 'center', color: '#e8e8e8' }}>
            <h1 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Algo salió mal</h1>
            <button
              onClick={() => window.location.reload()}
              style={{ padding: '0.5rem 1.5rem', background: '#e8e8e8', color: '#0a0a0a', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
              Recargar página
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
)
