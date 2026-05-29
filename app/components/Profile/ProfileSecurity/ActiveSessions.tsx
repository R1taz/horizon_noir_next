'use client'

import { easeOut, motion } from 'framer-motion'
import { useSessions, useRevokeOtherSessions } from '@/app/src/features/sessions/model/useSessions'
import { parseUserAgent, timeAgo } from '@/app/src/features/sessions/lib/parseUserAgent'
import type { ISession } from '@/app/src/features/sessions/api/getSessions'

const topVariants = {
	initial: { opacity: 0, y: 20 },
	animate: { opacity: 1, y: 0 },
}

const SessionRow = ({ session }: { session: ISession }) => {
	const { os, browser } = parseUserAgent(session.user_agent)
	return (
		<div className='flex flex-col mx-3 mt-3'>
			<span className='text-500'>
				{os} · {browser}
			</span>
			<span className='text-600 text-sm'>
				{session.is_current
					? 'Активна сейчас'
					: session.last_used_at
					? timeAgo(session.last_used_at)
					: 'Не использовалась'}
			</span>
		</div>
	)
}

const ActiveSessions = () => {
	const { data: sessions, isLoading, error } = useSessions()
	const { mutateAsync: revokeOthers, isPending: revoking } = useRevokeOtherSessions()

	const current = sessions?.find(s => s.is_current)
	const others = sessions?.filter(s => !s.is_current) ?? []

	const handleRevoke = async () => {
		if (others.length === 0) return
		try {
			await revokeOthers()
		} catch {
			// fall through
		}
	}

	return (
		<motion.article
			variants={topVariants}
			initial='initial'
			animate='animate'
			transition={{ duration: 0.5, ease: easeOut, delay: 0.6 }}
			className='mt-5'
		>
			<h3 className='text-400'>Активность</h3>

			{isLoading && <p className='text-600 mt-3 mx-3'>Загрузка...</p>}
			{error && <p className='text-red-400 mt-3 mx-3'>Не удалось загрузить сеансы</p>}

			{!isLoading && !error && (
				<>
					<div className='mt-2'>
						<span className='text-500 mx-3'>Это устройство</span>
						{current ? (
							<SessionRow session={current} />
						) : (
							<p className='text-600 mx-3 mt-1'>Не найдено</p>
						)}
					</div>

					{others.length > 0 && (
						<div className='mt-5'>
							<span className='text-500 mx-3'>Другие сеансы ({others.length})</span>
							{others.map(s => (
								<SessionRow key={s.id} session={s} />
							))}
						</div>
					)}

					{others.length > 0 && (
						<button
							onClick={handleRevoke}
							disabled={revoking}
							className='mt-5 text-center text-lg w-full text-accent hover:underline disabled:opacity-50'
						>
							{revoking ? 'Завершение...' : 'Завершить все активные сеансы'}
						</button>
					)}
				</>
			)}
		</motion.article>
	)
}

export default ActiveSessions
