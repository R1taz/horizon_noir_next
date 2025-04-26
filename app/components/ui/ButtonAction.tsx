interface Props {
	label: string
	action: (params: unknown) => unknown
}

const ButtonAction = ({ action, label }: Props) => {
	return (
		<button
			onClick={action}
			className='text-[#333333] bg-accentBg text-center w-full font-bold rounded-[5px] py-1 mt-4'
		>
			{label}
		</button>
	)
}

export default ButtonAction
