/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./src/hooks/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // Hijau Rimba khas MancingGacor
        primary: "#012d1d",
        "primary-container": "#1b4332",
        "on-primary-container": "#86af99",
        
        // Pasir Hangat & Ornamen Tactical
        secondary: "#75593a",
        "secondary-fixed": "#ffddbb",
        "on-secondary-fixed": "#2b1701",
        
        // Indikator Panas / Gacor
        error: "#ba1a1a",
        "error-container": "#ffdad6",
        
        // Netral & Background
        background: "#f7f9ff",
        surface: "#f7f9ff",
        "surface-container-lowest": "#ffffff",
        "surface-container-low": "#eff4fc",
        "surface-container-high": "#e3e9f0",
        "surface-container-highest": "#dde3eb",
        "on-surface": "#161c22",
        "on-surface-variant": "#414844",
        outline: "#717973",
      },
      spacing: {
        base: "8px",
        "container-margin": "20px",
        gutter: "16px",
        "touch-target-min": "48px",
      },
      borderRadius: {
        DEFAULT: "4px",
        lg: "8px",
        xl: "12px",
        "2xl": "16px", // Untuk card & bottom sheet
        "3xl": "32px", // rounded-t-[32px] untuk detail bottom sheet
      },
    },
  },
  plugins: [],
}
