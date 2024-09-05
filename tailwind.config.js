/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/Pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: "var(--font-roboto)",
        alt: "var(--font-baijamjuree)",
      },
      colors: {
        mauve: {
          50: "#fcb5ac",
          100: "#b99095",
          200: "#ffaebc",
        },
        green: {
          50: "#b5e5cf",
          100: "#3d5b59",
          200: "#013a20",
        },
        yellow: {
          50: "#fbe7c6",
        },
      },

      backgroundImage: {
        stripes:
          "linear-gradient(to bottom, rgba(255,255,255,0.1), rgba(255,255,255,0.1) 12.5%, transparent 12.5%, transparent)",
      },

      fontSize: {
        "5xl": "2.5rem",
      },

      backgroundSize: {
        stripes: "100% 8px",
      },

      blur: {
        full: "194px",
      },
    },
  },
  plugins: [],
};
