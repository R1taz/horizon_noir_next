import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

interface OrdersStore {
	orders: any[]
	setOrders: (orders: any) => void
	addOrder: (order: any) => void
}

export const useOrdersStore = create<OrdersStore>()(
	immer(set => ({
		orders: [],
		setOrders: orders =>
			set(state => {
				state.orders = orders
			}),
		addOrder: order =>
			set(state => {
				state.orders.push(order)
			}),
	}))
)
