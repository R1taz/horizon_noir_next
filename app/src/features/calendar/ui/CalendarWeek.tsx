interface Props {
	numberWeek: number[]
	activeDay: number
	setActiveDay: (day: number) => void
}

const CalendarWeek = ({ numberWeek, activeDay, setActiveDay }: Props) => {
	const styles = (idx: number) => {
		return `relative select-none cursor-pointer text-center py-2 z-10 ${
			activeDay === idx
				? 'text-accent font-bold after:content-[""] after:w-[25px] after:h-[25px] after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:z-0 after:rounded-full'
				: 'text-primary'
		}`
	}

	return (
		<>
			{numberWeek.map((number, idx) => {
				return (
					<span
						key={number + idx}
						className={styles(number)}
						onClick={() => {
							if (number === activeDay) setActiveDay(0)
							else setActiveDay(number)
						}}
					>
						{number < 10 ? '0' + number : number}
					</span>
				)
			})}
		</>
	)
}

export default CalendarWeek
