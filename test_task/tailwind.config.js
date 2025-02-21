/** @type {import('tailwindcss').Config} */

export default {
    important: true, // Оставляем, если другие стили переопределяют Tailwind
    content: [
      "./index.html", // Если у тебя есть index.html
      "./src/**/*.{js,ts,jsx,tsx}", // Обязательно указываем путь к src
    ],
    theme: {
      extend: {},
    },
    plugins: [],
  };