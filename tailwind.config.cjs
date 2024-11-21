module.exports = {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                sans: ['Roboto', 'Arial', 'sans-serif'], 
            },
            boxShadow: {
                c: "0 1px 6px rgb(32 33 36 / 28%)",
                c2: "0 1px 1px rgb(0 0 0 / 10%)",
            },
            animation: {
                'spin-slow': 'spin 3s linear infinite',
            }
        },
    },
    plugins: [],
};
