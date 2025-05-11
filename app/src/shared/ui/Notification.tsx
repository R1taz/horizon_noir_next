import { motion } from 'framer-motion'

const variantsNotification = {
	initial: { y: 20, opacity: 0 },
	animate: { y: 0, opacity: '90%' },
	hidden: { y: 20, opacity: 0 },
}

interface Props {
	text: string
}

const Notification = ({ text }: Props) => {
	return (
		<motion.article
			variants={variantsNotification}
			initial='initial'
			animate='animate'
			exit='hidden'
			transition={{ duration: 0.3 }}
			className='fixed flex justify-center items-center bottom-10 right-5 rounded-[8px] w-[400px] h-[75px] z-50 px-10 backdrop-blur-lg bg-white/10 shadow-lg'
		>
			<p className='text-500 text-center text-lg font-medium select-none'>{text}</p>
		</motion.article>
	)
}

export default Notification
