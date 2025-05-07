import { useAuthStore } from '@/app/src/widgets/cars'
import { useDeleteAccount } from '../model/useDeleteAccount'
import { useRouter } from 'next/navigation'
import { useUserStore } from '@/app/src/shared/model/useUserStore'

const ButtonDeleteAccount = ({ userId }: { userId: number }) => {
	const { mutateAsync } = useDeleteAccount()
	const setUser = useUserStore(state => state.setUser)
	const setAuthData = useAuthStore(state => state.setAuthData)
	const setInitialized = useAuthStore(state => state.setInitialized)

	const router = useRouter()

	const handleDelete = async () => {
		try {
			await mutateAsync(userId)
			setAuthData(false, 'no role')
			setUser(null)
			setInitialized(false)
			router.replace('/')
		} catch (error) {
			if ((error as any)?.response?.status === 401) {
				setAuthData(false, 'no role')
				router.replace('/login')
			}
		}
	}

	return (
		<button
			onClick={handleDelete}
			className='bg-secondaryBg font-bold text-lg py-[5px] text-accent rounded-[8px] block'
		>
			Удалить аккаунт
		</button>
	)
}

export default ButtonDeleteAccount
