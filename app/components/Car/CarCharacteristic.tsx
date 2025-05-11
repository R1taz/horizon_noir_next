interface Props {
	title: string
	text: string
}

const CarCharacteristic = ({ title, text }: Props) => {
	return (
		<span className='text-500 text-xl'>
			{title} {text}
		</span>
	)
}

export default CarCharacteristic
