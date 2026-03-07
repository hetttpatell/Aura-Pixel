import { Component } from 'react';

/**
 * Error Boundary Component
 * Catches JavaScript errors anywhere in the child component tree,
 * logs those errors, and displays a fallback UI.
 */
class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        // Log error to error reporting service in production
        console.error('ErrorBoundary caught an error:', error, errorInfo);

        this.setState({ errorInfo });

        // You can also log the error to an error reporting service here
        // logErrorToService(error, errorInfo);
    }

    handleReset = () => {
        this.setState({ hasError: false, error: null, errorInfo: null });
        // Optionally navigate to home or reload
        window.location.href = '/';
    };

    render() {
        if (this.state.hasError) {
            // Custom fallback UI
            if (this.props.fallback) {
                return this.props.fallback;
            }

            return (
                <div className="min-h-[60vh] flex items-center justify-center p-4">
                    <div className="max-w-md w-full text-center">
                        <div className="mb-6">
                            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary-light flex items-center justify-center">
                                <svg
                                    className="w-10 h-10 text-primary-teal"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                    />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-heading font-bold text-text-heading mb-2">
                                Oops! Something went wrong
                            </h2>
                            <p className="text-text-body mb-6">
                                We're sorry for the inconvenience. Please try refreshing the page or go back to the homepage.
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <button
                                onClick={() => window.location.reload()}
                                className="btn btn-secondary px-6 py-3"
                            >
                                Refresh Page
                            </button>
                            <button
                                onClick={this.handleReset}
                                className="btn btn-primary px-6 py-3"
                            >
                                Go to Homepage
                            </button>
                        </div>
                        {process.env.NODE_ENV === 'development' && this.state.error && (
                            <details className="mt-6 text-left bg-gray-100 p-4 rounded-lg text-sm">
                                <summary className="cursor-pointer font-medium text-text-heading">
                                    Error Details (Development Only)
                                </summary>
                                <pre className="mt-2 overflow-auto text-red-600 text-xs">
                                    {this.state.error.toString()}
                                    {this.state.errorInfo && this.state.errorInfo.componentStack}
                                </pre>
                            </details>
                        )}
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
