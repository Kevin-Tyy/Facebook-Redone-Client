/** @type {import('tailwindcss').Config} */
export default {
	mode : 'jit',
	darkMode : 'class',
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				light: "#D8D8D8",
				"primary-100": "#343845",
				"primary-200": "#1e2029",
				"primary-300": "#010A13",
				"background-primary" : '#0E0f17',
				"blue-base": "#2563EB",
				"blue-light" : "#478EE6",
				"blue-dark" : "#1E40AF",
			},
		},
		screens: {
			xs: "400px",
			sm: "640px",
			md: "768px",
			lg: "1024px",
			xl: "1280px",
			"2xl": "1536px",
			"3xl": "1920px",
		},
	},
	plugins: [],
};
