import Link from 'next/link'

interface Props {
	label: string
	carId: number
}

const LinkAction = ({ label, carId }: Props) => {
	return (
		<Link
			href={`/catalog/${carId}`}
			className='text-accent text-center w-full font-bold border-[2px] border-accent rounded-[5px] py-1 mt-4'
		>
			{label}
		</Link>
	)
}

export default LinkAction
