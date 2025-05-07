import { useMutation } from '@tanstack/react-query'
import { deleteAccount } from '../api/deleteAccount'

export const useDeleteAccount = () => {
	return useMutation({
		mutationFn: (userId: number) => deleteAccount(userId),
	})
}
