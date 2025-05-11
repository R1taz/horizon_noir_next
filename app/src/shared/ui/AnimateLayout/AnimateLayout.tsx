import { AnimatePresence, motion } from 'framer-motion'
import styles from './styles.module.css'

const variantsDiv = {
	initial: { opacity: 0 },
	visible: { opacity: 1 },
	hidden: { opacity: 0 },
}

const variantsTitle = {
	initial: { scale: 0.95 },
	visible: { scale: 1 },
	hidden: { scale: 0.95 },
}

const AnimateLayout = () => {
	return (
		<>
			<motion.div
				className='absolute flex justify-center items-center left-0 top-0 w-full h-full bg-900 z-10'
				initial='initial'
				animate='visible'
				exit='hidden'
				transition={{ duration: 0.4, ease: 'easeOut' }}
				variants={variantsDiv}
			>
				<motion.h1
					variants={variantsTitle}
					transition={{ duration: 0.4, ease: 'easeOut' }}
					initial='initial'
					animate='visible'
					exit='hidden'
					className={styles.logoTitle}
				>
					HORIZON NOIR
				</motion.h1>
			</motion.div>
		</>
	)
}

export default AnimateLayout
