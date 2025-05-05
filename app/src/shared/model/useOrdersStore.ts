import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { IOrder, OrdersStatus } from '../types/orders'

interface OrdersStore {
	statusOrders: OrdersStatus
	orders: IOrder[]
	page: number
	pageSize: number
	portionSize: number
	totalCountOrders: number
	setPage: (page: number) => void
	setTotalCountOrders: (totalCount: number) => void
	setStatusOrders: (status: OrdersStatus) => void
	setOrders: (orders: IOrder[]) => void
	updateOrder: (updateOrder: IOrder) => void
}

export const useOrdersStore = create<OrdersStore>()(
	immer(set => ({
		statusOrders: 'active',
		orders: [],
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
				state.orders = state.orders.map(order =>
					order.id === updateOrder.id
						? { ...updateOrder, main_photo_url: order.main_photo_url }
						: order
				)
			}),
	}))
)
