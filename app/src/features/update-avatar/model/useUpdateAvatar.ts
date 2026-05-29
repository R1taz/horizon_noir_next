import { useMutation } from '@tanstack/react-query'
import { updateAvatar } from '../api/updateAvatar'

export const useUpdateAvatar = () => {
	return useMutation({
		mutationFn: (file: File) => updateAvatar(file),
	})
}
