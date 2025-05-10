import { useCalendarStore } from '@/app/src/shared/model/useCalendarStore'
import CalendarWeek from './CalendarWeek'
import DaysWeek from './DaysWeek'
import MonthsYear from './MonthsYear'
import ToggleYear from './ToggleYear'
import { calculateCalendarDays } from '../model/calculateCalendarDays'
import { useEffect } from 'react'
import { IReservation } from '@/app/src/shared/types/reservations'

const Calendar = ({ reservationsForMonth }: { reservationsForMonth: IReservation[] }) => {
	const calendar = useCalendarStore()

	useEffect(() => {
		calendar.setYear(new Date().getFullYear())
		calendar.setMonth(new Date().getMonth())
		calendar.setDay(new Date().getDate())
		calendar.setHours(new Date().getHours())
		return () => {
			calendar.setYear(null)
			calendar.setMonth(null)
			calendar.setDay(null)
			calendar.setHours(null)
		}
	}, [])

	const chunkedNumbers = calculateCalendarDays(calendar.year!, calendar.month!)

	const weeks: React.ReactElement[] = []

	for (let i = 0; i < chunkedNumbers.length; i++) {
		weeks.push(
			<CalendarWeek
				key={i}
				activeDay={{ day: calendar.day!, month: calendar.month! }}
				setActiveDay={calendar.setDay}
				setActiveMonth={calendar.setMonth}
				numberWeek={chunkedNumbers[i]}
				reservationsForMonth={reservationsForMonth}
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
