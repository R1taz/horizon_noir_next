import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { ICurrentEditOrder, IOrder } from '../types/orders'
import { RequestsTabFilter } from '../types/requests'

interface OrdersStore {
	statusOrders: RequestsTabFilter
	orders: IOrder[]
	currentEditOrder: ICurrentEditOrder
	page: number
	pageSize: number
	portionSize: number
	totalCountOrders: number
	setPage: (page: number) => void
	setTotalCountOrders: (totalCount: number) => void
	setStatusOrders: (status: RequestsTabFilter) => void
	setOrders: (orders: IOrder[]) => void
	updateOrder: (updateOrder: IOrder) => void
	resetCurrentEditOrder: () => void
	updateCurrentEditOrder: (key: keyof ICurrentEditOrder, value: string) => void
}

export const useOrdersStore = create<OrdersStore>()(
	immer(set => ({
		statusOrders: 'active',
		orders: [],
		currentEditOrder: {
			amount: '',
			percentPrepaymentAmount: '',
			deliveryAddress: '',
			deliveryDate: '',
			numberParkDay: '',
			paymentParkingDay: '',
			startParkingDate: '',
			endParkingDate: '',
		},
		page: 1,
		pageSize: 4,
		portionSize: 5,
		totalCountOrders: 0,
		setPage: page =>
			set(state => {
				state.page = page
			}),
		setTotalCountOrders: totalCount =>
			set(state => {
				state.totalCountOrders = totalCount
			}),
		setStatusOrders: status =>
			set(state => {
				state.statusOrders = status
			}),
		setOrders: orders =>
			set(state => {
				state.orders = orders
			}),
		updateOrder: updateOrder =>
			set(state => {
				state.orders = state.orders.map(order => {
					return order.id === updateOrder.id
						? { ...updateOrder, main_photo_url: order.main_photo_url }
						: order
				})
			}),
		resetCurrentEditOrder: () =>
			set(state => {
				state.currentEditOrder = {
					amount: '',
					percentPrepaymentAmount: '',
					deliveryAddress: '',
					deliveryDate: '',
					numberParkDay: '',
					paymentParkingDay: '',
					startParkingDate: '',
					endParkingDate: '',
				}
			}),
		updateCurrentEditOrder: (key, value) =>
			set(state => {
				state.currentEditOrder = {
					...state.currentEditOrder,
					[key]: value,
				}
			}),
	}))
)
