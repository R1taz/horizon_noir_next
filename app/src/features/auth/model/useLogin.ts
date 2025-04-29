import { useMutation } from '@tanstack/react-query'
import { login } from '../api/login'
import { LoginData } from '@/app/interfaces/authInterface'

export const useLogin = () => {
	return useMutation({
		mutationFn: ({ email, password }: LoginData) => login({ email, password }),
	})
}
