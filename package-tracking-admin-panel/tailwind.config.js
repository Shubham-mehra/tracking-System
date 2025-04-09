// tailwind.config.js
export default {
    content: [
      './src/pages/**/*.{js,ts,jsx,tsx}',
      './src/components/**/*.{js,ts,jsx,tsx}',
      './src/app/**/*.{js,ts,jsx,tsx}', // For the App Directory (if using Next.js 13+)
    ],
    theme: {
      extend: {},
    },
    plugins: [],
    darkMode: 'media', // This ensures dark mode works based on prefers-color-scheme
  };
  