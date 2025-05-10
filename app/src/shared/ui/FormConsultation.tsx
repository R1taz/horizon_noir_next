interface Props {
	title: string
	description: string
	titleAction: string
	action: () => void
	children: React.ReactNode
}

const FormConsultation = ({ title, description, titleAction, action, children }: Props) => {
	return (
		<article className='my-24 w-[50%] mx-auto rounded-[8px] border-4 border-accentBg py-14'>
			<h1 className='text-headlines text-4xl font-bold text-center'>{title}</h1>
			<p className='text-primary my-8 text-xl text-center'>{description}</p>
			{children}
			<button
				onClick={action}
				className='rounded-[8px] w-[85%] block mx-auto mt-10 mb-5 text-[#333333] font-bold text-xl text-center bg-accentBg py-2'
			>
				{titleAction}
			</button>
		</article>
	)
}

export default FormConsultation
