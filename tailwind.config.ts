import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        parchment: "#f8f2e8",
        ink: "#2f2b26",
        cedar: "#8c5a3c",
        moss: "#708a58"
      }
    }
  },
  plugins: []
};

export default config;
