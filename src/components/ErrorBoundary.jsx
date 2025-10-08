import React from 'react';

// Basic error boundary to catch render errors and show fallback UI
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.error('ErrorBoundary caught an error', error, info);
    }
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
          <h1 className="text-2xl font-semibold mb-2">Something went wrong.</h1>
          <p className="text-sm opacity-80 mb-4">{this.state.error?.message}</p>
          <button onClick={this.handleRetry} className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 text-sm">Retry</button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
