import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ManufacturingDashboard.css";

const defaultParams = {
  Granulation_Time: "",
  Binder_Amount: "",
  Drying_Temp: "",
  Drying_Time: "",
  Compression_Force: "",
  Machine_Speed: "",
  Lubricant_Conc: "",
  Moisture_Content: "",
  Tablet_Weight: "",
};

const paramLabels = {
  Granulation_Time: { label: "Granulation Time", unit: "min", icon: "⏱" },
  Binder_Amount: { label: "Binder Amount", unit: "kg", icon: "🧪" },
  Drying_Temp: { label: "Drying Temperature", unit: "°C", icon: "🌡" },
  Drying_Time: { label: "Drying Time", unit: "min", icon: "⏳" },
  Compression_Force: { label: "Compression Force", unit: "kN", icon: "💪" },
  Machine_Speed: { label: "Machine Speed", unit: "rpm", icon: "⚙️" },
  Lubricant_Conc: { label: "Lubricant Concentration", unit: "%", icon: "💧" },
  Moisture_Content: { label: "Moisture Content", unit: "%", icon: "🌊" },
  Tablet_Weight: { label: "Tablet Weight", unit: "mg", icon: "⚖️" },
};

const resultConfig = {
  Hardness: { label: "Hardness", unit: "N", icon: "💎", color: "#6366f1" },
  Friability: { label: "Friability", unit: "%", icon: "🧱", color: "#f59e0b" },
  Dissolution_Rate: {
    label: "Dissolution Rate",
    unit: "%",
    icon: "⚗️",
    color: "#10b981",
  },
  Content_Uniformity: {
    label: "Content Uniformity",
    unit: "%",
    icon: "📊",
    color: "#3b82f6",
  },
};

function getQualityStatus(key, value) {
  if (key === "Friability")
    return value < 1
      ? { label: "PASS", ok: true }
      : { label: "FAIL", ok: false };

  if (key === "Dissolution_Rate")
    return value >= 80
      ? { label: "PASS", ok: true }
      : { label: "FAIL", ok: false };

  if (key === "Content_Uniformity")
    return value >= 95 && value <= 105
      ? { label: "PASS", ok: true }
      : { label: "FAIL", ok: false };

  if (key === "Hardness")
    return value >= 80 && value <= 110
      ? { label: "PASS", ok: true }
      : { label: "FAIL", ok: false };

  return null;
}

export default function ManufacturingDashboard() {
  const [params, setParams] = useState(defaultParams);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [dark, setDark] = useState(true);

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      dark ? "dark" : "light",
    );
  }, [dark]);

  const handleChange = (e) =>
    setParams({ ...params, [e.target.name]: e.target.value });

  const handlePredict = async () => {
    setError("");
    setResults(null);
    for (const key of Object.keys(params)) {
      if (params[key] === "") {
        setError(`Missing field: ${paramLabels[key].label}`);
        return;
      }
    }
    const payload = {};
    for (const key of Object.keys(params))
      payload[key] = parseFloat(params[key]);
    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:8000/predict_batch",
        payload,
      );
      setResults(res.data);
    } catch (err) {
      setError(
        err.response?.data?.detail ||
          err.message ||
          "Failed to connect to server.",
      );
    } finally {
      setLoading(false);
    }
  };

  const allPassed = results
    ? Object.keys(resultConfig).every((k) => {
        const s = getQualityStatus(k, results[k]);
        return s ? s.ok : true;
      })
    : null;

  return (
    <div className="mfg-dashboard">
      {/* ── Animated background orbs ── */}
      <div className="bg-orb orb1" />
      <div className="bg-orb orb2" />
      <div className="bg-orb orb3" />

      {/* ── Header ── */}
      <header className="mfg-header">
        <div className="mfg-header-inner">
          <div className="mfg-logo">
            <div className="mfg-logo-icon">
              <svg
                viewBox="0 0 44 44"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="22"
                  cy="22"
                  r="20"
                  stroke="url(#lg1)"
                  strokeWidth="2.5"
                />
                <path
                  d="M13 22 L22 13 L31 22 L22 31 Z"
                  fill="url(#lg1)"
                  opacity="0.85"
                />
                <circle cx="22" cy="22" r="5" fill="white" />
                <defs>
                  <linearGradient
                    id="lg1"
                    x1="0"
                    y1="0"
                    x2="44"
                    y2="44"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#6366f1" />
                    <stop offset="1" stopColor="#a855f7" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div>
              <span className="mfg-logo-title">
                VIGIL<span className="mfg-logo-ai">-AI</span>
              </span>
              <span className="mfg-logo-sub">
                Manufacturing Intelligence Platform
              </span>
            </div>
          </div>

          <div className="mfg-header-right">
            <span className="badge badge-live">● LIVE</span>
            <span className="badge badge-sys">MFG-SYS v2.4</span>

            {/* Dark / Light toggle */}
            <button
              className="theme-toggle"
              onClick={() => setDark((d) => !d)}
              title={dark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {dark ? (
                /* Sun icon */
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
              ) : (
                /* Moon icon */
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
              <span>{dark ? "Light Mode" : "Dark Mode"}</span>
            </button>
          </div>
        </div>
      </header>

      {/* ── Main ── */}
      <main className="mfg-main">
        {/* ── Left: Form ── */}
        <section className="mfg-panel mfg-form-panel">
          <div className="panel-header">
            <div className="panel-icon-wrap">
              <span>⚙️</span>
            </div>
            <div>
              <h2 className="panel-title">Batch Parameters</h2>
              <p className="panel-subtitle">
                Configure manufacturing inputs for quality prediction
              </p>
            </div>
          </div>

          <div className="mfg-form-grid">
            {Object.keys(params).map((key) => {
              const meta = paramLabels[key];
              return (
                <div className="mfg-field" key={key}>
                  <label className="mfg-label">
                    <span className="field-icon">{meta.icon}</span>
                    {meta.label}
                    <span className="field-unit">{meta.unit}</span>
                  </label>
                  <input
                    className="mfg-input"
                    type="number"
                    name={key}
                    value={params[key]}
                    onChange={handleChange}
                    placeholder={`Enter ${meta.label.toLowerCase()}`}
                    step="any"
                  />
                </div>
              );
            })}
          </div>

          {error && (
            <div className="mfg-error">
              <svg
                viewBox="0 0 20 20"
                fill="currentColor"
                width="16"
                height="16"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
              {error}
            </div>
          )}

          <button
            className={`mfg-predict-btn${loading ? " loading" : ""}`}
            onClick={handlePredict}
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="btn-spinner" /> Analyzing Batch…
              </>
            ) : (
              <>
                <span className="btn-glow-ring" />
                <span>🔮</span> Predict Batch Quality
              </>
            )}
          </button>
        </section>

        {/* ── Right: Results ── */}
        <section className="mfg-panel mfg-results-panel">
          <div className="panel-header">
            <div className="panel-icon-wrap">
              <span>📊</span>
            </div>
            <div>
              <h2 className="panel-title">Quality Predictions</h2>
              <p className="panel-subtitle">
                AI-powered batch quality analysis output
              </p>
            </div>
          </div>

          {!results && !loading && (
            <div className="mfg-empty-state">
              <div className="empty-icon-wrap">🧬</div>
              <p className="empty-title">No Prediction Yet</p>
              <p className="empty-sub">
                Fill in all parameters and click
                <br />
                "Predict Batch Quality" to run the AI model.
              </p>
            </div>
          )}

          {loading && (
            <div className="mfg-loading-state">
              <div className="loading-ring" />
              <p className="loading-txt">Running AI Model…</p>
              <p className="loading-sub">
                Analyzing {Object.keys(params).length} manufacturing parameters
              </p>
            </div>
          )}

          {results && (
            <div className="results-wrapper">
              {/* Verdict */}
              <div
                className={`mfg-verdict ${allPassed ? "verdict-pass" : "verdict-fail"}`}
              >
                <span className="verdict-icon">{allPassed ? "✅" : "❌"}</span>
                <div>
                  <strong>
                    {allPassed ? "Batch Approved" : "Batch Rejected"}
                  </strong>
                  <span className="verdict-sub">
                    {allPassed
                      ? " — All parameters within specification"
                      : " — One or more parameters out of specification"}
                  </span>
                </div>
              </div>

              {/* Cards */}
              <div className="mfg-result-grid">
                {Object.keys(resultConfig).map((key, i) => {
                  const cfg = resultConfig[key];
                  const value = results[key];
                  const status = getQualityStatus(key, value);
                  const pct = Math.min(100, Math.abs(parseFloat(value || 0)));
                  return (
                    <div
                      className="result-card"
                      key={key}
                      style={{
                        "--card-color": cfg.color,
                        animationDelay: `${i * 80}ms`,
                      }}
                    >
                      <div className="card-accent" />
                      <div className="result-card-header">
                        <span className="result-icon">{cfg.icon}</span>
                        <span className="result-label">{cfg.label}</span>
                        {status && (
                          <span
                            className={`result-badge ${status.ok ? "badge-pass" : "badge-fail"}`}
                          >
                            {status.label}
                          </span>
                        )}
                      </div>
                      <div className="result-value">
                        {typeof value === "number" ? value.toFixed(3) : value}
                        <span className="result-unit">{cfg.unit}</span>
                      </div>
                      <div className="result-bar-track">
                        <div
                          className="result-bar-fill"
                          style={{ width: `${pct}%`, background: cfg.color }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Timestamp */}
              <div className="mfg-timestamp">
                <svg
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  width="12"
                  height="12"
                >
                  <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z" />
                  <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z" />
                </svg>
                Prediction at {new Date().toLocaleTimeString()} ·{" "}
                {new Date().toLocaleDateString()}
              </div>
            </div>
          )}
        </section>
      </main>

      <footer className="mfg-footer">
        <span>© 2025 VIGIL-AI Manufacturing Intelligence</span>
        <span>Powered by FastAPI · React · Scikit-Learn</span>
      </footer>
    </div>
  );
}
