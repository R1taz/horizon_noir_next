import { NextRequest, NextResponse } from 'next/server'
import { COOKIE } from './app/src/shared/constants/auth'
import { axiosInstance } from './app/src/shared/api/axiosInstance'

export async function middleware(req: NextRequest) {
	if (req.url.includes('/api')) return NextResponse.next()

	const accessToken = req.cookies.get(COOKIE.ACCESS_TOKEN)?.value

	if (!accessToken) {
		const refreshToken = req.cookies.get(COOKIE.REFRESH_TOKEN)

		if (!refreshToken) return NextResponse.redirect(new URL('/login', req.url))

		try {
			const res = await axiosInstance.post('/api/refresh')
			if (res.status !== 200) return NextResponse.redirect(new URL('/login', req.url))
			return NextResponse.next()
		} catch (error) {
			console.log(error)
			return NextResponse.redirect(new URL('/login', req.url))
		}
	}

	return NextResponse.next()
}

export const config = {
	matcher: ['/catalog/:path*', '/profile/:path*'],
}
