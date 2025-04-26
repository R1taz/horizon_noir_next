interface Props {
	title: string
	options: { label: string; value: string }[]
	value: string
	onChange: (value: string) => void
}

const RadioGroup = ({ title, options, value, onChange }: Props) => {
	return (
		<article className='w-[40%] mx-auto mt-12 mb-6'>
			<h2 className='text-headlines text-xl text-center font-medium'>{title}</h2>
			<section className='flex justify-between my-3'>
				{options.map((option, idx) => (
					<div className='flex' key={idx}>
						<div
							className={`flex bg-accentBg rounded-[50%] w-7 h-7 ${
								value === option.value ? 'bg-accentBg' : 'bg-secondaryBg'
							}`}
							onClick={() => onChange(option.value)}
						></div>
						<p className='ms-2 text-primary text-base'>{option.label}</p>
					</div>
				))}
			</section>
		</article>
	)
}

export default RadioGroup
