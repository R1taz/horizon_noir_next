import { formatMonth } from '@/app/src/shared/lib/format/formatMonth'

interface Props {
	activeMonth: number
	setActiveMonth: (month: number) => void
}

const MonthsYear = ({ activeMonth, setActiveMonth }: Props) => {
	const styles = (idx: number) => {
		return `cursor-pointer ${activeMonth === idx ? 'text-accent text-bold' : 'text-400'}`
	}

	return (
		<section className='overflow-x-scroll py-2 flex justify-between gap-3 mt-2'>
			{[...new Array(12)].map((_, idx) => (
				<span key={idx} className={styles(idx)} onClick={() => setActiveMonth(idx)}>
					{formatMonth(idx)}
				</span>
			))}
		</section>
	)
}

export default MonthsYear
