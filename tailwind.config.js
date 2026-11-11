/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  theme: {
    extend: {
      "colors": {
        "surface-tint": "#525f75",
        "tertiary": "#000000",
        "primary-fixed-dim": "#bac7e1",
        "surface-variant": "#d3e4fe",
        "primary-fixed": "#d6e3fe",
        "secondary-fixed": "#54fdc4",
        "on-secondary-container": "#007152",
        "surface": "#f8f9ff",
        "secondary-container": "#51fac1",
        "on-tertiary-fixed": "#2a1700",
        "tertiary-fixed": "#ffddb8",
        "tertiary-container": "#2a1700",
        "on-background": "#0b1c30",
        "on-tertiary-fixed-variant": "#653e00",
        "secondary-fixed-dim": "#27e0a9",
        "surface-dim": "#cbdbf5",
        "primary-container": "#0e1c2f",
        "tertiary-fixed-dim": "#ffb95f",
        "inverse-on-surface": "#eaf1ff",
        "on-secondary": "#ffffff",
        "secondary": "#006c4f",
        "outline-variant": "#c5c6cd",
        "surface-container-highest": "#d3e4fe",
        "surface-bright": "#f8f9ff",
        "on-primary-fixed-variant": "#3a475c",
        "inverse-primary": "#bac7e1",
        "error-container": "#ffdad6",
        "on-secondary-fixed": "#002116",
        "primary": "#000000",
        "inverse-surface": "#213145",
        "on-secondary-fixed-variant": "#00513b",
        "on-surface-variant": "#44474c",
        "on-surface": "#0b1c30",
        "outline": "#75777d",
        "error": "#ba1a1a",
        "on-primary-container": "#77849c",
        "on-tertiary": "#ffffff",
        "on-primary-fixed": "#0e1c2f",
        "on-primary": "#ffffff",
        "background": "#f8f9ff",
        "on-error-container": "#93000a",
        "on-tertiary-container": "#b87500",
        "on-error": "#ffffff",
        "surface-container-low": "#eff4ff",
        "surface-container-high": "#dce9ff",
        "surface-container": "#e5eeff",
        "surface-container-lowest": "#ffffff",
        "surface-lowest": "#ffffff"
      },
      "borderRadius": {
        "DEFAULT": "0.125rem",
        "lg": "0.25rem",
        "xl": "0.5rem",
        "full": "0.75rem"
      },
      "spacing": {
        "space-md": "1rem",
        "gutter": "1.5rem",
        "gutter-mobile": "1rem",
        "space-xl": "2.5rem",
        "space-sm": "0.5rem",
        "space-xs": "0.25rem",
        "margin-mobile": "1.25rem",
        "margin": "3rem",
        "space-lg": "1.5rem"
      },
      "fontFamily": {
        "display-hero-mobile": ["var(--font-space-grotesk)", "Space Grotesk", "sans-serif"],
        "body-sm": ["var(--font-inter)", "Inter", "sans-serif"],
        "display-hero": ["var(--font-space-grotesk)", "Space Grotesk", "sans-serif"],
        "label-code": ["var(--font-space-grotesk)", "Space Grotesk", "sans-serif"],
        "headline-sm": ["var(--font-space-grotesk)", "Space Grotesk", "sans-serif"],
        "headline-lg": ["var(--font-space-grotesk)", "Space Grotesk", "sans-serif"],
        "label-lg": ["var(--font-inter)", "Inter", "sans-serif"],
        "headline-lg-mobile": ["var(--font-space-grotesk)", "Space Grotesk", "sans-serif"],
        "headline-md": ["var(--font-space-grotesk)", "Space Grotesk", "sans-serif"],
        "body-lg": ["var(--font-inter)", "Inter", "sans-serif"],
        "body-md": ["var(--font-inter)", "Inter", "sans-serif"],
        "label-md": ["var(--font-inter)", "Inter", "sans-serif"]
      },
      "fontSize": {
        "display-hero-mobile": [
          "36px",
          {
            "lineHeight": "44px",
            "letterSpacing": "-0.02em",
            "fontWeight": "700"
          }
        ],
        "body-sm": [
          "13px",
          {
            "lineHeight": "20px",
            "letterSpacing": "0em",
            "fontWeight": "400"
          }
        ],
        "display-hero": [
          "56px",
          {
            "lineHeight": "64px",
            "letterSpacing": "-0.03em",
            "fontWeight": "700"
          }
        ],
        "label-code": [
          "11px",
          {
            "lineHeight": "14px",
            "letterSpacing": "0.08em",
            "fontWeight": "700"
          }
        ],
        "headline-sm": [
          "20px",
          {
            "lineHeight": "28px",
            "letterSpacing": "0em",
            "fontWeight": "600"
          }
        ],
        "headline-lg": [
          "36px",
          {
            "lineHeight": "44px",
            "letterSpacing": "-0.02em",
            "fontWeight": "700"
          }
        ],
        "label-lg": [
          "14px",
          {
            "lineHeight": "20px",
            "letterSpacing": "0.01em",
            "fontWeight": "600"
          }
        ],
        "headline-lg-mobile": [
          "28px",
          {
            "lineHeight": "36px",
            "letterSpacing": "-0.01em",
            "fontWeight": "700"
          }
        ],
        "headline-md": [
          "24px",
          {
            "lineHeight": "32px",
            "letterSpacing": "-0.01em",
            "fontWeight": "600"
          }
        ],
        "body-lg": [
          "18px",
          {
            "lineHeight": "28px",
            "letterSpacing": "-0.01em",
            "fontWeight": "400"
          }
        ],
        "body-md": [
          "15px",
          {
            "lineHeight": "24px",
            "letterSpacing": "0em",
            "fontWeight": "400"
          }
        ],
        "label-md": [
          "12px",
          {
            "lineHeight": "16px",
            "letterSpacing": "0.02em",
            "fontWeight": "600"
          }
        ]
      }
    },
  },
};