import styles from './styles.module.css'
import { motion } from 'framer-motion'

const variantsItemSkeleton = {
	initial: { opacity: 0 },
	animate: { opacity: 1 },
	exit: { opacity: 0 },
}

interface Props {
	width: number
	height: number
	count?: number
	flow?: 'vertical' | 'horizontal'
}

const Skeleton = ({ width, height, count = 1, flow = 'vertical' }: Props) => {
	return (
		<>
			{count === 1 && <article className={styles.skeleton} style={{ width, height }}></article>}

			{count > 1 && (
				<motion.section
					variants={variantsItemSkeleton}
					initial='initial'
					animate='animate'
					exit='exit'
					className='flex gap-3 my-3'
					style={{ flexDirection: flow === 'vertical' ? 'column' : 'row' }}
				>
					{[...new Array(count)].map((_, idx) => {
						return (
							<article key={idx} className={styles.skeleton} style={{ width, height }}></article>
						)
					})}
				</motion.section>
			)}
		</>
	)
}

export default Skeleton
