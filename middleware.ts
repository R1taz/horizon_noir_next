import { NextRequest, NextResponse } from 'next/server'
import { COOKIE } from './app/src/shared/constants/auth'
import { axiosInstance } from './app/src/shared/api/axiosInstance'

export async function middleware(request: NextRequest) {
	if (request.url.includes('/api')) return NextResponse.next()

	const accessToken = request.cookies.get(COOKIE.ACCESS_TOKEN)?.value

	if (!accessToken) {
		const refreshToken = request.cookies.get(COOKIE.REFRESH_TOKEN)?.value

		if (!refreshToken) return NextResponse.redirect(new URL('/login', request.url))

		try {
			const res = await axiosInstance.post(
				'/api/refresh',
				{},
				{
					headers: { Cookie: `accessToken=${accessToken}; refreshToken=${refreshToken}` },
				}
			)
			if (res.status !== 200) return NextResponse.redirect(new URL('/login', request.url))

			const next = NextResponse.next()
			const setCookies = res.headers['set-cookie']
			if (setCookies) {
				;(Array.isArray(setCookies) ? setCookies : [setCookies]).forEach(c =>
					next.headers.append('set-cookie', c)
				)
			}

			return next
		} catch (error: any) {
			console.log(error.response.status)
			return NextResponse.redirect(new URL('/login', request.url))
		}
	}

	return NextResponse.next()
}

export const config = {
	matcher: ['/catalog/:path*', '/profile/:path*'],
}
