import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#F5F7FA",
        foreground: "var(--foreground)",
        surface: "#F5F7FA",
        dash_gray: "#718EBF",
        dash_red: "#FE5C73",
        dash_blac: "#232323",
      },
    },
  },
  plugins: [],
};
export default config;
