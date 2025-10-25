import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class", '[data-theme="dark"]'],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: {
          app: "var(--color-bg-app)",
          elevated: "var(--color-bg-elevated)",
          subtle: "var(--color-bg-subtle)",
        },
        textc: {
          primary: "var(--color-text-primary)",
          secondary: "var(--color-text-secondary)",
          muted: "var(--color-text-muted)",
          onPrimary: "var(--color-text-on-primary)"
        },
        borderc: {
          soft: "var(--color-border-soft)",
          strong: "var(--color-border-strong)"
        },
        brand: {
          solid: "var(--color-brand-solid)"
        },
        status: {
          success: "var(--color-success)",
          warning: "var(--color-warning)",
          error:   "var(--color-error)",
          info:    "var(--color-info)"
        }
      },
      backgroundImage: {
        "brand-gradient": "var(--gradient-brand)"
      },
      boxShadow: {
        glass: "var(--glass-shadow)"
      },
      backdropBlur: {
        12: "12px",
        20: "20px"
      }
    }
  },
  plugins: []
};
export default config;
