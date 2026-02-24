import { useToast } from "../contexts/ToastContext";

export default function Toasts() {
  const { toasts } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="toast-container" role="region" aria-live="polite" aria-label="Notifications">
      {toasts.map((t) => (
        <div key={t.id} className={`toast ${t.type}`} role="alert">
          <span className="toast-icon" aria-hidden="true">
            {t.type === "success" ? "✓" : "✗"}
          </span>
          {t.msg}
        </div>
      ))}
    </div>
  );
}
