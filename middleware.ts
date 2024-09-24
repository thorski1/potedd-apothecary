import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
	const res = NextResponse.next();
	const supabase = createMiddlewareClient({ req, res });
	const {
		data: { session },
	} = await supabase.auth.getSession();

	if (session) {
		await supabase.auth.refreshSession();
	}

	return NextResponse.next();
}

export const config = {
	matcher: [
		"/api/:path*",
		"/auth/:path*",
		"/((?!_next/static|_next/image|favicon.ico).*)",
	],
};