import React from 'react'

interface Props {
	title: string
	type: '400' | '500'
	action: () => void
}

const RequestButton = ({ title, type, action }: Props) => {
	const styles = type === '400' ? 'text-300 bg-accent' : 'text-accent border-2 border-accent'

	return (
		<button
			onClick={action}
			className={`w-[75%] mx-auto p-[5px] font-bold text-center rounded-[8px] ${styles}`}
		>
			{title}
		</button>
	)
}

export default RequestButton
