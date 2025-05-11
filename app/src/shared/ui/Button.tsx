import { ReactElement } from 'react'

type Props = {
	type: '400' | '500'
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
	const buttonColor = type === '400' ? 'accent' : 'transparent'
	const border = type === '500' ? 'border-2 border-accent' : ''
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
