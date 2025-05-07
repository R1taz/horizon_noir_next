import { useCalendarStore } from '@/app/src/shared/model/useCalendarStore'
import CalendarWeek from './CalendarWeek'
import DaysWeek from './DaysWeek'
import MonthsYear from './MonthsYear'
import ToggleYear from './ToggleYear'
import { calculateCalendarDays } from '../model/calculateCalendarDays'
import { useEffect } from 'react'

const Calendar = () => {
	const calendar = useCalendarStore()

	useEffect(() => {
		if (!calendar.year || !calendar.month) {
			calendar.setYear(new Date().getFullYear())
			calendar.setMonth(new Date().getMonth())
			calendar.setDay(new Date().getDate())
		}
		return () => {
			calendar.setYear(null)
			calendar.setMonth(null)
			calendar.setDay(null)
		}
	}, [])

	if (!calendar.year || !calendar.month) return <div className='primary'>Skeleton</div>

	const chunkedNumbers = calculateCalendarDays(calendar.year!, calendar.month!)

	const weeks: React.ReactElement[] = []

	for (let i = 0; i < chunkedNumbers.length; i++) {
		weeks.push(
			<CalendarWeek
				key={i}
				activeDay={calendar.day!}
				setActiveDay={calendar.setDay!}
				numberWeek={chunkedNumbers[i]}
			/>
		)
	}

	return (
		<section>
			<h2 className='text-headlines text-xl text-center font-medium'>Выберите даты бронирования</h2>

			<article className='mt-2 rounded-[8px] bg-quaternaryBg w-[85%] mx-auto px-7 py-3'>
				<ToggleYear />
				<MonthsYear activeMonth={calendar.month!} setActiveMonth={calendar.setMonth!} />
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
