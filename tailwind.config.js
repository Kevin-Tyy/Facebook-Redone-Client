/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				light: "#D8D8D8",
				"primary-100": "#0C88EF",
				"primary-200": "#0D1D2E",
				"primary-300": "#010A13",
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
