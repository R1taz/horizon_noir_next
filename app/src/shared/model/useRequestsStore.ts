import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { RequestsTabFilter, RequestsTypeFilter } from '../types/requests'

interface RequestsStore {
	statusRequests: RequestsTabFilter
	typeRequests: RequestsTypeFilter
	setStatusRequests: (status: RequestsTabFilter) => void
	setTypeRequests: (type: RequestsTypeFilter) => void
}

export const useRequestsStore = create<RequestsStore>()(
	immer(set => ({
		statusRequests: 'active',
		typeRequests: 'reservations',
		setStatusRequests: status =>
			set(state => {
				state.statusRequests = status
			}),
		setTypeRequests: type =>
			set(state => {
				state.typeRequests = type
			}),
	}))
)
