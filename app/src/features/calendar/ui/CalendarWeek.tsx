import { IReservation } from '@/app/src/shared/types/reservations'
import { CalendarNumber, StatusBusy } from '../model/types'
import { findBusyDay } from '../model/findBusyDay'

interface Props {
	numberWeek: CalendarNumber[]
	activeDay: { day: number; month: number }
	reservationsForMonth: IReservation[]
	setActiveDay: (day: number | null) => void
	setActiveMonth: (month: number | null) => void
}

const CalendarWeek = ({
	numberWeek,
	activeDay,
	reservationsForMonth,
	setActiveDay,
	setActiveMonth,
}: Props) => {
	const styles = (status: StatusBusy, day: number, month: number) => {
		const isActive = activeDay.day === day && activeDay.month === month

		let stylesDay = 'relative select-none cursor-pointer text-center py-2 z-10'

		if (activeDay.month !== month) {
			stylesDay += ' text-600'
			return stylesDay
		}
		if (status === 'empty' && !isActive) stylesDay += ' text-400'
		if (status === 'half' && !isActive) stylesDay += ' text-500'
		if (status === 'full') stylesDay += ' text-900'

		if (status !== 'full' && isActive) {
			stylesDay += ' text-900 bg-accent font-bold after:absolute after:z-0 after:rounded-[8px]'
		}
		return stylesDay
	}

	return (
		<>
			{numberWeek.map(number => {
				const statusBusy =
					activeDay.month === number.month
						? findBusyDay(reservationsForMonth, number.value)
						: 'empty'
				return (
					<span
						key={number.id}
						className={styles(statusBusy, number.value, number.month)}
						onClick={() => {
							if (statusBusy === 'full') return
							if (number.value !== activeDay.day) {
								setActiveDay(number.value)
								if (number.month !== activeDay.month) setActiveMonth(number.month)
							}
						}}
					>
						{number.value < 10 ? '0' + number.value : number.value}
					</span>
				)
			})}
		</>
	)
}

export default CalendarWeek
