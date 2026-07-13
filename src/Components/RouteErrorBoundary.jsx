import { Component } from 'react'

class RouteErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error) {
    console.error('Route render error:', error)
  }

  handleReload = () => {
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: '60vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
            padding: '40px 20px',
            color: '#fff',
            textAlign: 'center',
          }}
        >
          <h2 style={{ margin: 0, fontSize: '24px' }}>Page failed to load</h2>
          <p style={{ margin: 0, opacity: 0.7 }}>
            This can happen after a site update. Please reload.
          </p>
          <button
            type="button"
            onClick={this.handleReload}
            style={{
              padding: '12px 24px',
              borderRadius: '10px',
              border: 'none',
              background: '#4a9eff',
              color: '#fff',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Reload page
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

export default RouteErrorBoundary
