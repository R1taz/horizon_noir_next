interface Props<T> {
	title: string
	options: { label: string; value: T }[]
	value: T
	onChange: (value: T) => void
}

function RadioGroup<T>({ title, options, value, onChange }: Props<T>) {
	return (
		<article className='w-[50%] mx-auto mt-12 mb-6'>
			<h2 className='text-300 text-xl text-center font-bold'>{title}</h2>
			<section className='flex justify-between my-3'>
				{options.map((option, idx) => (
					<div className='flex' key={idx}>
						<div
							className={`flex rounded-[50%] w-7 h-7 ${
								value === option.value ? 'bg-accent' : 'bg-700'
							}`}
							onClick={() => onChange(option.value)}
						></div>
						<p className='ms-2 text-400 text-base'>{option.label}</p>
					</div>
				))}
			</section>
		</article>
	)
}

export default RadioGroup
