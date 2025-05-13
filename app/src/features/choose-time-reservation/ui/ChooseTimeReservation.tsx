'use client'

import { useWebSocket } from '@/app/src/shared/contexts/WebSocketContext'
import { useCalendarStore } from '@/app/src/shared/model/useCalendarStore'
import { useUserStore } from '@/app/src/shared/model/useUserStore'
import { PaymentMethod } from '@/app/src/shared/types/requests'
import { IReservation } from '@/app/src/shared/types/reservations'
import Modal from '@/app/src/shared/ui/Modal'
import { createReservation } from '@/app/src/widgets/FormReservationCar/api/createReservation'
import { useParams } from 'next/navigation'
import React from 'react'
import { findBusyHour } from '../model/findBusyHour'

interface Props {
	reservationsForMonth: IReservation[]
	methodPayment: PaymentMethod
	onClose: () => void
	setIsOpenNotification: (open: boolean) => void
	setMessageNotification: (message: string) => void
}

const ChooseTimeReservation = ({
	reservationsForMonth,
	methodPayment,
	onClose,
	setIsOpenNotification,
	setMessageNotification,
}: Props) => {
	const userId = useUserStore(state => state.id)
	const { carId } = useParams()

	const socket = useWebSocket()

	const year = useCalendarStore(state => state.year)
	const month = useCalendarStore(state => state.month)
	const day = useCalendarStore(state => state.day)
	const calendarHours = useCalendarStore(state => state.hours)
	const setHours = useCalendarStore(state => state.setHours)

	const handleSubmit = () => {
		setIsOpenNotification(false)
		setMessageNotification('')

		if (!year || !month || !day || !calendarHours) {
			setIsOpenNotification(true)
			setMessageNotification(
				`Вы не выбрали ${!year ? 'год' : !month ? 'месяц' : !day ? 'день' : 'время'} бронирования`
			)
			return
		}

		if (new Date() > new Date(year, month, day, calendarHours)) {
			setIsOpenNotification(true)
			setMessageNotification('Дата бронирования не может быть назначена в прошедший день')
		}

		createReservation({
			socket: socket!,
			user_id: userId!,
			car_id: +carId,
			payment_method: methodPayment,
			reservation_date: new Date(year, month, day, calendarHours),
		})
		setHours(null)
		onClose()
	}

	const modalOptions = [
		{
			label: 'Забронировать',
			action: () => handleSubmit(),
		},
		{
			label: 'Отменить выбор времени',
			action: () => onClose(),
		},
	]
	const filterOptions = [
		{
			label: '8:00 - 9:00',
			value: 8,
		},
		{
			label: '9:00 - 10:00',
			value: 9,
		},
		{
			label: '10:00 - 11:00',
			value: 10,
		},
		{
			label: '11:00 - 12:00',
			value: 11,
		},
		{
			label: '12:00 - 13:00',
			value: 12,
		},
		{
			label: '13:00 - 14:00',
			value: 13,
		},
		{
			label: '14:00 - 15:00',
			value: 14,
		},
		{
			label: '15:00 - 16:00',
			value: 15,
		},
		{
			label: '16:00 - 17:00',
			value: 16,
		},
		{
			label: '17:00 - 18:00',
			value: 17,
		},
		{
			label: '18:00 - 19:00',
			value: 18,
		},
		{
			label: '19:00 - 20:00',
			value: 19,
		},
	]

	const handleClick = (busyReservation: IReservation | undefined, hour: number) => {
		if (busyReservation) {
			if (hour === new Date(busyReservation.reservation_date).getHours()) {
				return
			}
		}
		if (hour === calendarHours) setHours(null)
		else setHours(hour)
	}

	const styles = (hour: number, isBusy: boolean) => {
		let stylesHour = 'rounded-[4px] w-6 h-6 mr-3 cursor-pointer'
		if (hour === calendarHours && !isBusy) stylesHour += ' bg-accent'
		if (hour !== calendarHours && !isBusy) stylesHour += ' bg-600'
		if (isBusy) stylesHour += ' bg-500'
		return stylesHour
	}

	return (
		<Modal title='Выбрать время бронирования' options={modalOptions}>
			<section className='my-10 grid grid-flow-col gap-x-16 grid-rows-[100px_100px_100px_100px] justify-center items-center'>
				{filterOptions.map((option, idx) => {
					const busyReservation = findBusyHour(reservationsForMonth, day!, option.value)

					return (
						<article key={idx} className='flex items-center my-3'>
							<div
								className={`${styles(option.value, busyReservation ? true : false)}`}
								onClick={() => handleClick(busyReservation, option.value)}
							></div>
							<span className='text-400 text-lg'>{option.label}</span>
						</article>
					)
				})}
			</section>
		</Modal>
	)
}

export default ChooseTimeReservation
