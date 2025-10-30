// tailwind.config.js
module.exports = {
	content: [
	  './pages/**/*.{js,ts,jsx,tsx}',
	  './components/**/*.{js,ts,jsx,tsx}',
	  './app/**/*.{js,ts,jsx,tsx}', // if using app dir in Next.js
	],
	theme: {
	  extend: {
		// fontFamily: {
		//   roboto: ['Roboto', 'sans-serif'],
		// },
		boxShadow: {
		  '5': '0px 3px 8px rgba(0, 0, 0, 0.24)',
		},
	  },
	},
	plugins: [],
  };
  