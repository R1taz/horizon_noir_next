import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { IOrder } from '../types/orders'

interface OrdersStore {
	statusOrders: 'active' | 'completed' | 'cancelled'
	orders: IOrder[]
	setStatusOrders: (status: 'active' | 'completed' | 'cancelled') => void
	setOrders: (orders: IOrder[]) => void
	updateOrder: (updateOrder: IOrder) => void
}

export const useOrdersStore = create<OrdersStore>()(
	immer(set => ({
		statusOrders: 'active',
		orders: [],
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
