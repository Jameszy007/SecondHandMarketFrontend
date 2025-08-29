// src/App.jsx
import React, { useEffect } from "react";
import AppRouter from "./app/router";
import ErrorBoundary from "./components/ErrorBoundary";
import performCompleteCleanup from "./utils/cleanupUtils";

function App() {
  useEffect(() => {
    // Expose cleanup function globally for easy access
    window.cleanupApp = () => {
      console.log('🧹 Manual cleanup triggered...');
      performCompleteCleanup();
    };

    // Handle page unload/refresh to clear data (optional)
    const handleBeforeUnload = () => {
      // Uncomment the line below if you want automatic cleanup on page refresh/close
      // performCompleteCleanup();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    // Cleanup function for the effect
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      delete window.cleanupApp;
    };
  }, []);

  return (
    <ErrorBoundary>
      <AppRouter />
    </ErrorBoundary>
  );
}

export default App;
