import { Component } from "react";
import { toast } from "react-toastify";

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        console.error("ErrorBoundary caught an error:", error, info);
        toast.error("Something went wrong. Please try again.");
    }

    render() {
        if (this.state.hasError) {
            return <h2 style={{ padding: '1rem', color: 'red' }}>Oops! Something broke.</h2>;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
