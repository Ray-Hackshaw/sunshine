import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        wix: ["var(--font-wix)"],
      },
      colors: {
        blue: "#14213D",
        sun: "#FCA311",
        cloud: "#E5E5E5",
        dark: "#131313",
      },
    },
  },
  plugins: [],
} satisfies Config;
