import CalendarWeek from './CalendarWeek'
import DaysWeek from './DaysWeek'
import MonthsYear from './MonthsYear'
import ToggleYear from './ToggleYear'

const Calendar = () => {
	const numbersDayWeek = [...new Array(31)].map((_, idx) => idx + 1)

	const chunkedNumbers = numbersDayWeek.reduce<number[][]>((acc, _, idx) => {
		if (idx % 7 === 0) acc.push(numbersDayWeek.slice(idx, idx + 7))
		return acc
	}, [])

	const weeks: React.ReactElement[] = []

	for (let i = 0; i < chunkedNumbers.length; i++) {
		weeks.push(<CalendarWeek key={i} numberWeek={chunkedNumbers[i]} />)
	}

	return (
		<section>
			<h2 className='text-headlines text-xl text-center font-medium'>Выберите даты бронирования</h2>

			<article className='mt-2 rounded-[8px] bg-quaternaryBg w-[85%] mx-auto px-7 py-3'>
				<ToggleYear />
				<MonthsYear />
				<div className='bg-accentBg h-[2px] w-full my-3'></div>
				<div className='grid grid-cols-7 w-full '>
					<DaysWeek />
					{weeks}
				</div>
			</article>
		</section>
	)
}

export default Calendar
