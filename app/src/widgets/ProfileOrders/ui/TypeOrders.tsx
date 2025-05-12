import { easeInOut, easeOut, motion } from 'framer-motion'

const typeOrdersVariants = {
	initial: { opacity: 0, x: -20 },
	animate: { opacity: 1, x: 0 },
}

const topVariants = {
	initial: { opacity: 0, y: 15 },
	animate: { opacity: 1, y: 0 },
}

const TypeOrders = () => {
	return (
		<motion.article
			variants={typeOrdersVariants}
			initial='initial'
			animate='animate'
			transition={{ duration: 0.7, ease: easeInOut }}
			className='relative flex items-center gap-2 rounded-[8px] py-1 px-3 bg-700'
		>
			<motion.span
				variants={topVariants}
				initial='initial'
				animate='animate'
				transition={{ duration: 0.5, ease: easeOut, delay: 0.6 }}
				className='text-500'
			>
				Тип заявки
			</motion.span>
			<motion.span
				variants={topVariants}
				initial='initial'
				animate='animate'
				transition={{ duration: 0.5, ease: easeOut, delay: 0.6 }}
				className='text-accent text-xl'
			>
				Индивидуальный заказ
			</motion.span>
		</motion.article>
	)
}

export default TypeOrders
