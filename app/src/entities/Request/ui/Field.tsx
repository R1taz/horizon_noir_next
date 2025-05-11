import React from 'react'

interface Props {
	title: string
	info: string
}

const Field = ({ title, info }: Props) => {
	return (
		<div>
			<span className='text-500'>{title}:</span>
			<span className='text-400 ml-1'>{info}</span>
		</div>
	)
}

export default Field
