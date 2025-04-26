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
				primaryBg: '#1A1A1A',
				secondaryBg: '#333333',
				tertiaryBg: '#535353',
				quaternaryBg: '#292929',
				accentBg: '#D1A954',
				headlines: '#EDEDED',
				primary: '#E0E0E0',
				secondary: '#A0A0A0',
				accent: '#D1A954',
			},
		},
	},
	plugins: [],
}
export default config
