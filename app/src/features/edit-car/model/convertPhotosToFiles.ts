export function convertPhotosToFiles(photos: { url: string }[]): Promise<File[]> {
	return Promise.all(
		photos.map(async item => {
			const path = item.url.replace(/\\/g, '/')
			const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_BACKEND_URL}/${path}`)
			let data = await res.blob()
			let metadata = {
				type: 'image/jpeg',
			}
			const filename = path.split('/').pop() || 'file.png'
			return new File([data], filename, metadata)
		})
	)
}
