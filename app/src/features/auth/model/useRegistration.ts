import { useMutation } from '@tanstack/react-query'
import { RegistrationData } from './types'
import { registration } from '../api/registration'

export const useRegistration = () => {
	return useMutation({
		mutationFn: ({ email, password, name, phone_number }: RegistrationData) => {
			return registration({ email, password, name, phone_number })
		},
	})
}
