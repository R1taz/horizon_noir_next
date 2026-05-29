import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getSessions } from '../api/getSessions'
import { revokeOtherSessions } from '../api/revokeOthers'

export const SESSIONS_QUERY_KEY = ['my-sessions'] as const

export const useSessions = () => {
	return useQuery({
		queryKey: SESSIONS_QUERY_KEY,
		queryFn: getSessions,
	})
}

export const useRevokeOtherSessions = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: revokeOtherSessions,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: SESSIONS_QUERY_KEY })
		},
	})
}
