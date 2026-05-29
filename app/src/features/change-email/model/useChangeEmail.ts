import { useMutation } from '@tanstack/react-query'
import { changeEmail } from '../api/changeEmail'

export const useChangeEmail = () => {
	return useMutation({ mutationFn: changeEmail })
}
