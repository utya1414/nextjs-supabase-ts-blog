import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: "#00040f",
        secondary: "#00f6ff",
        dimWhite: "rgba(255, 255, 255, 0.7)",
        dimBlue: "rgba(9, 151, 124, 0.1)",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      typography: {
        DEFAULT: {
          css: {
            h1: {
              background: `linear-gradient(
                157.81deg,
                #def9fa -43.27%,
                #bef3f5 -21.24%,
                #9dedf0 12.19%,
                #7de7eb 29.82%,
                #5ce1e6 51.94%,
                #33bbcf 90.29%
              );`,
              "-webkit-background-clip": "text",
              "-webkit-text-fill-color": "transparent",
              "background-clip": "text",
            },
            h2: {
              background: `linear-gradient(
                157.81deg,
                #def9fa -43.27%,
                #bef3f5 -21.24%,
                #9dedf0 12.19%,
                #7de7eb 29.82%,
                #5ce1e6 51.94%,
                #33bbcf 90.29%
              );`,
              "-webkit-background-clip": "text",
              "-webkit-text-fill-color": "transparent",
              "background-clip": "text",
            },
            h3: {
              color: "#00f6ff",
            },
            h4: {
              color: "#00f6ff",
            },
            p: {
              color: "rgba(255, 255, 255, 0.7)",
            },
            a: {
              color: `rgba(255, 255, 255, 0.7)`,
              "&:hover": {
                color: "rgba(255, 255, 255, 0.9)",
              },
            },
            blockquote: {
              color: "rgba(255, 255, 255, 0.7)",
            },
            figure: {
              color: "rgba(255, 255, 255, 0.7)",
            },
            figcaption: {
              color: "rgba(255, 255, 255, 0.7)",
            },
            strong: {
              color: "rgba(255, 255, 255, 0.7)",
            },
            em: {
              color: "rgba(255, 255, 255, 0.7)",
            },
            code: {
              color: "rgba(255, 255, 255, 0.7)",
            },
            pre: {
              color: "rgba(255, 255, 255, 0.7)",
            },
            ol: {
              color: "rgba(255, 255, 255, 0.7)",
            },
            ul: {
              color: "rgba(255, 255, 255, 0.7)",
            },
            li: {
              color: "rgba(255, 255, 255, 0.7)",
            },
            table: {
              color: "rgba(255, 255, 255, 0.7)",
            },
            thead: {
              color: "rgba(255, 255, 255, 0.7)",
            },
            tr: {
              color: "rgba(255, 255, 255, 0.7)",
            },
            th: {
              color: "rgba(255, 255, 255, 0.7)",
            },
            td: {
              color: "rgba(255, 255, 255, 0.7)",
            },
            hr: {
              borderColor: "rgba(255, 255, 255, 0.7)",
            },
          },
        },
      },
    },
  },
  screens: {
    xs: "480px",
    ss: "620px",
    sm: "768px",
    md: "1060px",
    lg: "1200px",
    xl: "1700px",
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
