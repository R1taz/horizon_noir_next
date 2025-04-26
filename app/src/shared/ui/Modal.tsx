import Image from 'next/image'
import closeModalImg from '../../assets/removeCar.png'

interface Props {
	title: string
	children: React.ReactElement
	onSave: (params: unknown) => void
	onClose: () => void
}

const Modal = ({ title, children, onSave, onClose }: Props) => {
	return (
		<article className='absolute inset-0 m-auto bg-quaternaryBg border-2 border-quaternaryBg rounded-[8px] px-3'>
			<Image
				src={closeModalImg}
				alt='Закрыть модальное окно'
				onClick={onClose}
				className='w-[10px] h-[10px]'
			/>
			<h1 className='text-accent'>{title}</h1>

			{children}

			<button
				className='w-[50%] mx-auto text-xl font-bold bg-accentBg text-[#292929] rounded-[8px]'
				onClick={onSave}
			>
				Сохранить изменения
			</button>
			<button className='w-[50%]' onClick={onClose}>
				Отменить изменения
			</button>
		</article>
	)
}

export default Modal
