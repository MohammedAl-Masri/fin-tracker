import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { Suspense } from "react"
import { logout } from "@/lib/actions"

const WelcomeMessage = async()=>{
    const session = await auth()
    if(!session) redirect('/login')
    const test = JSON.stringify(session.user)
    return (
        <h1>Welcome {session.user?.name}</h1>
    )
}

const DashboardPage = () => {
    return(
    <div>
        <Suspense fallback={'Loading...'}>
            <WelcomeMessage />
        </Suspense>
        <form action={logout}>
            <button>Logout</button>
        </form>
    </div>)
}
export default DashboardPage
