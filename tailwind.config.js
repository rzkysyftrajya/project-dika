/** @type {import('tailwindcss/tailwind-config').TailwindConfig} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}", // Tailwind will search for classes in all pages
        "./components/**/*.{js,ts,jsx,tsx}", // and all components
    ],
    theme: {
        extend: {},
    },
    plugins: [],
};