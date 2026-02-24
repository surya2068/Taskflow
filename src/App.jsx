import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { ToastProvider } from "./contexts/ToastContext";
import LoginPage from "./components/LoginPage";
import AppShell from "./components/AppShell";

import "./styles/globals.css";
import "./styles/components.css";
import "./styles/layout.css";
import "./styles/views.css";

/**
 * AppRouter — Conditionally renders LoginPage or AppShell
 * based on authentication state. Demonstrates route-level conditional rendering.
 */
function AppRouter() {
  const { user } = useAuth();
  return user ? <AppShell /> : <LoginPage />;
}

/**
 * App — Root component.
 * Wraps the entire application with:
 *   - ThemeProvider   (dark/light theme)
 *   - AuthProvider    (authentication state)
 *   - ToastProvider   (global notifications)
 */
export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ToastProvider>
          <AppRouter />
        </ToastProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
