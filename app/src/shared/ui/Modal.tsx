import { ReactNode } from 'react'

interface Props {
	title: string
	options: { label: string; action: (params: unknown) => void }[]
	children: ReactNode
}

const Modal = ({ title, options, children }: Props) => {
	return (
		<article className='absolute bg-quaternaryBg border-2 border-accentBg rounded-[8px] p-5 z-10'>
			<h1 className='text-accent text-2xl font-bold mt-2 mb-5'>{title}</h1>

			<div className='my-2 relative'>
				<div className='relative top-0 left-1/2 -ml-[50vw] w-screen h-[2px] bg-accentBg'></div>
			</div>

			{children}

			<section className='flex flex-col gap-3 my-5'>
				{options.map((option, idx) => (
					<button
						key={option.label}
						className={`w-[50%] py-1 mx-auto text-xl font-bold ${idx === 0 ? 'bg-accentBg' : ''} ${
							idx === 1 ? 'border-2 border-accentBg' : ''
						} ${idx === 1 ? 'text-accent' : 'text-[#292929]'} rounded-[7px]`}
						onClick={option.action}
					>
						{option.label}
					</button>
				))}
			</section>
		</article>
	)
}

export default Modal
