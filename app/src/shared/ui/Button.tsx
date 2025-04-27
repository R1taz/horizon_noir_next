import { ReactElement } from 'react'

type Props = {
	type: 'primary' | 'secondary'
	children: ReactElement
	width?: number
	py?: number
	px?: number
	my?: number | 'auto'
	mx?: number | 'auto'
}

const Button = ({
	type,
	children,
	width = 50,
	py = 2,
	px = 2,
	mx = 'auto',
	my = 'auto',
}: Props) => {
	const buttonColor = type === 'primary' ? '#D1A954' : 'transparent'
	const border = type === 'secondary' ? 'border-2 border-accentBg' : ''
	return (
		<button
			className={`${buttonColor} ${border} py=${py} px=${px} my=${my} mx=${mx} rounded-[8px] text-lg font-bold`}
			style={{ width: width + '%' }}
		>
			{children}
		</button>
	)
}

export default Button
