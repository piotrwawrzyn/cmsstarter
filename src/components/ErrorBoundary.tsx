import React, { Component, ErrorInfo } from "react";

type State = {
  error: Error | null;
  errorInfo: ErrorInfo | null;
};

type Props = {};

class ErrorBoundary extends Component<Props, State> {
  state: State = {
    error: null,
    errorInfo: null
  };

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  render() {
    if (this.state.errorInfo) {
      return (
        <div>
          <h2>Something went wrong.</h2>
          <details style={{ whiteSpace: "pre-wrap" }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
