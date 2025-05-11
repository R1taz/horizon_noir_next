import type { Config } from 'tailwindcss'

const config: Config = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			colors: {
				900: '#1A1A1A',
				800: '#292929',
				700: '#333333',
				600: '#535353',
				500: '#A0A0A0',
				400: '#E0E0E0',
				300: '#EDEDED',
				accent: '#D1A954',
			},
			fontFamily: {
				wix: ['WixMadeforDisplay', 'Arial', 'sans-serif'],
			},
		},
	},
	plugins: [],
}
export default config
