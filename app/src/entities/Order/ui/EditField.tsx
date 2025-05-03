import React from 'react'

interface Props {
	title: string
	placeholder: string
	unit: string
	value: string
	type?: string
	setValue: (value: string) => void
}

function EditField({ title, type = 'text', placeholder, unit, value, setValue }: Props) {
	const handleChange: React.ChangeEventHandler<HTMLInputElement> = e => {
		setValue(e.currentTarget.value)
	}

	return (
		<div>
			<span className='text-secondary'>{title}:</span>
			<input
				type={type}
				placeholder={placeholder}
				value={value}
				onChange={handleChange}
				className='ml-1 py-[0.5px] px-2 rounded-[8px] bg-tertiaryBg text-center text-primary placeholder-secondary'
			/>
			<span>{unit}</span>
		</div>
	)
}

export default EditField
