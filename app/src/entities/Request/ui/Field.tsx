import React from 'react'

interface Props {
	title: string
	info: string
}

const Field = ({ title, info }: Props) => {
	return (
		<div>
			<span className='text-secondary'>{title}:</span>
			<span className='text-primary ml-1'>{info}</span>
		</div>
	)
}

export default Field
