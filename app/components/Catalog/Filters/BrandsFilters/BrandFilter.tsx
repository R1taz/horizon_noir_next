import React from 'react'

interface Props {
	brandName: string
}

const BrandFilter = ({ brandName }: Props) => {
	return (
		<article className='px-3 py-1 text-lg my-3 bg-quaternaryBg rounded-[8px] text-secondary'>
			{brandName}
		</article>
	)
}

export default BrandFilter
