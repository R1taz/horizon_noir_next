'use client'

import { useCalendarStore } from '@/app/src/shared/model/useCalendarStore'

const ToggleYear = () => {
	const startYear = useCalendarStore(state => state.startYear)
	const endYear = useCalendarStore(state => state.endYear)
	const year = useCalendarStore(state => state.year)
	const setYear = useCalendarStore(state => state.setYear)

	const stylesButton = (yearDisabled: number): string => {
		return year === yearDisabled ? 'text-[600] cursor-pointer' : 'text-accent cursor-pointer'
	}

	return (
		<div className='flex justify-end'>
			<div>
				<button
					className={stylesButton(startYear)}
					onClick={() => setYear(year! - 1)}
					disabled={year === startYear}
				>
					{'<'}
				</button>
				<span className='text-400 font-semibold text-xl mx-2'>{year}</span>
				<button
					className={stylesButton(endYear)}
					onClick={() => setYear(year! + 1)}
					disabled={year === endYear}
				>
					{'>'}
				</button>
			</div>
		</div>
	)
}

export default ToggleYear
