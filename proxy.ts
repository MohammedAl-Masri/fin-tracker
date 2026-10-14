import { auth } from "./auth";
import { NextResponse } from "next/server";

const publicRoutes = ['/login', '/register']

export const proxy = auth((req)=>{
    const isLoggedIn = !!req.auth
    const pathname = req.nextUrl.pathname
    const isPublicRoute = publicRoutes.includes(pathname)

    if(!isLoggedIn && !isPublicRoute){
        const loginUrl = new URL('/login', req.nextUrl)

        return NextResponse.redirect(loginUrl)
    }
    if(isLoggedIn && isPublicRoute){
        const dashboardUrl = new URL('/dashboard', req.nextUrl)

        return NextResponse.redirect(dashboardUrl)
    }
})

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}