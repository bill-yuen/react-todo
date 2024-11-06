/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // 自定义主题颜色
        primary: "#4285f4",
      },
    },
  },
  plugins: [],
};
