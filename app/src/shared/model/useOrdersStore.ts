import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

interface OrdersStore {
	statusOrders: 'active' | 'completed' | 'cancelled'
	orders: any[]
	setStatusOrders: (status: 'active' | 'completed' | 'cancelled') => void
	setOrders: (orders: any[]) => void
	addOrder: (order: any) => void
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
		addOrder: order =>
			set(state => {
				state.orders.push(order)
			}),
	}))
)
