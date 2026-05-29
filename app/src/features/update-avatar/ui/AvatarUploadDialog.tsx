'use client'

import { useEffect, useRef, useState } from 'react'
import Dialog from '@/app/src/shared/ui/Dialog'
import { useUpdateAvatar } from '../model/useUpdateAvatar'
import { useUserStore } from '@/app/src/shared/model/useUserStore'

interface Props {
	isOpen: boolean
	onClose: () => void
}

const MAX_SIZE_BYTES = 5 * 1024 * 1024

const AvatarUploadDialog = ({ isOpen, onClose }: Props) => {
	const [file, setFile] = useState<File | null>(null)
	const [previewUrl, setPreviewUrl] = useState<string | null>(null)
	const [error, setError] = useState<string | null>(null)
	const inputRef = useRef<HTMLInputElement | null>(null)

	const { mutateAsync, isPending } = useUpdateAvatar()
	const setPhotoUrl = useUserStore(s => s.setPhotoUrl)

	useEffect(() => {
		return () => {
			if (previewUrl) URL.revokeObjectURL(previewUrl)
		}
	}, [previewUrl])

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const f = e.target.files?.[0]
		if (!f) return
		if (!f.type.startsWith('image/')) {
			setError('Допускаются только изображения')
			return
		}
		if (f.size > MAX_SIZE_BYTES) {
			setError('Размер файла не должен превышать 5 МБ')
			return
		}
		setError(null)
		setFile(f)
		if (previewUrl) URL.revokeObjectURL(previewUrl)
		setPreviewUrl(URL.createObjectURL(f))
	}

	const reset = () => {
		if (previewUrl) URL.revokeObjectURL(previewUrl)
		setFile(null)
		setPreviewUrl(null)
		setError(null)
	}

	const handleClose = () => {
		if (isPending) return
		reset()
		onClose()
	}

	const handleSave = async () => {
		if (!file) return
		try {
			const updated = await mutateAsync(file)
			setPhotoUrl(updated.photo_url ?? null)
			reset()
			onClose()
		} catch {
			setError('Не удалось загрузить аватар')
		}
	}

	return (
		<Dialog isOpen={isOpen} onClose={handleClose}>
			<h2 className='text-2xl font-bold text-accent mb-4'>Изменить фото профиля</h2>

			{previewUrl ? (
				// eslint-disable-next-line @next/next/no-img-element
				<img
					src={previewUrl}
					alt='Превью'
					className='w-48 h-48 object-cover rounded-full mx-auto mb-4 border-2 border-accent'
				/>
			) : (
				<div className='w-48 h-48 bg-700 rounded-full mx-auto mb-4 flex items-center justify-center text-500'>
					Не выбрано
				</div>
			)}

			<input
				ref={inputRef}
				type='file'
				accept='image/jpeg,image/png,image/webp'
				onChange={handleFileChange}
				className='hidden'
			/>
			<button
				onClick={() => inputRef.current?.click()}
				disabled={isPending}
				className='w-full mb-2 py-2 border-2 border-accent text-accent font-bold rounded-[8px] hover:bg-accent hover:text-700 transition-colors disabled:opacity-50'
			>
				{file ? `Выбран: ${file.name}` : 'Выбрать файл'}
			</button>

			{error && <p className='text-red-400 text-sm mb-2'>{error}</p>}

			<p className='text-600 text-sm mb-6'>JPEG, PNG или WEBP, до 5 МБ.</p>

			<div className='flex gap-3 justify-end'>
				<button
					onClick={handleClose}
					disabled={isPending}
					className='px-6 py-2 text-500 font-bold rounded-[8px] hover:text-400 transition-colors disabled:opacity-50'
				>
					Отмена
				</button>
				<button
					onClick={handleSave}
					disabled={!file || isPending}
					className='px-6 py-2 bg-accent text-700 font-bold rounded-[8px] disabled:opacity-30 disabled:cursor-not-allowed'
				>
					{isPending ? 'Загрузка...' : 'Сохранить'}
				</button>
			</div>
		</Dialog>
	)
}

export default AvatarUploadDialog
