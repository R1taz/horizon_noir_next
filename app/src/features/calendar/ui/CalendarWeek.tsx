interface Props {
	numberWeek: number[]
}

const CalendarWeek = ({ numberWeek }: Props) => {
	return (
		<>
			{numberWeek.map((number, idx) => {
				return (
					<span key={number + idx} className='text-center text-primary py-1'>
						{number}
					</span>
				)
			})}
		</>
	)
}

export default CalendarWeek
