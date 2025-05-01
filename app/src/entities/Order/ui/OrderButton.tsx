import React from 'react'

interface Props {
	title: string
	type: 'primary' | 'secondary'
	action: () => void
}

const OrderButton = ({ title, type, action }: Props) => {
	const styles =
		type === 'primary' ? 'text-headlines bg-accentBg' : 'text-accent border-2 border-accentBg'

	return (
		<button
			onClick={action}
			className={`w-[75%] mx-auto p-[5px] font-bold text-center rounded-[8px] ${styles}`}
		>
			{title}
		</button>
	)
}

export default OrderButton
