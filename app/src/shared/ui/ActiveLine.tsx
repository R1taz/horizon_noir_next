import { motion } from 'framer-motion'

const ActiveLine = () => {
	return (
		<motion.div layoutId='activeItem' className='w-full h-[4px] absolute bottom-[-6px] bg-accent' />
	)
}

export default ActiveLine
