import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";
import { simulateDelay } from "../utils/async";

export default function LoginPage() {
  const { login }         = useAuth();
  const { theme, toggleTheme } = useTheme();

  const [email,    setEmail]    = useState("admin@taskflow.io");
  const [password, setPassword] = useState("password");
  const [error,    setError]    = useState("");
  const [loading,  setLoading]  = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) { setError("Email is required."); return; }
    if (password.length < 6) { setError("Password must be at least 6 characters."); return; }

    setLoading(true);
    await simulateDelay(900);

    login({
      name:  email.split("@")[0],
      email,
      role: "Admin",
    });
    setLoading(false);
  };

  return (
    <div className="login-page">
      <div className="login-noise" />
      <div className="login-orb login-orb-1" />
      <div className="login-orb login-orb-2" />

      {/* Theme toggle */}
      <button className="theme-toggle login-theme-btn" onClick={toggleTheme}>
        {theme === "dark" ? "☀️" : "🌙"}
      </button>

      <div className="login-card">
        {/* Logo */}
        <div className="login-logo">
          <div className="login-logo-icon">⟐</div>
          <span className="login-logo-text">TaskFlow</span>
        </div>

        <h1 className="login-title">Welcome back</h1>
        <p className="login-sub">// sign in to your workspace</p>

        {/* Error */}
        {error && <div className="login-error">⚠ {error}</div>}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.io"
              required
              autoFocus
            />
          </div>

          <div className="field">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? (
              <>
                <span className="spinner" style={{ width: 16, height: 16, borderWidth: 2 }} />
                Signing in...
              </>
            ) : (
              "Sign in →"
            )}
          </button>
        </form>

        <p className="login-hint">
          Demo: any email + <span>6+ char password</span>
        </p>
      </div>
    </div>
  );
}
