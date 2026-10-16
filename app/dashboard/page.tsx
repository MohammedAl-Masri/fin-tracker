import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { Suspense } from "react"
import { logout } from "@/lib/actions"
import SalaryForm from "@/components/SalaryForm"
import { prisma } from "@/lib/db"

const WelcomeMessage = async()=>{
    const session = await auth()
    if(!session) redirect('/login')
    return (
        <h1>Welcome {session.user?.name}</h1>
    )
}
const SalaryList = async()=>{
    const session = await auth()
    if(!session || !session?.user?.id) redirect('/login')   
    const userId = Number(session.user?.id)
    const salary = await prisma.salary.findMany({
        where:{userId},
        orderBy:{
            date: 'desc'
        }
    })
    if(salary.length === 0){
        return <p>You don&apos;t have any salary yet!</p>
    }

    return(
        <div>{salary.map((i)=> (
                <div key={i.id}>
                    <div>Salary: {i.amount}</div>
                    <div>Date: {i.date.toLocaleDateString()}</div>
                </div>
            ))}
        </div>
    )
}

const DashboardPage = () => {
    return(
    <div>
        <Suspense fallback={'Loading...'}>
            <WelcomeMessage />
        </Suspense>
        <Suspense fallback={'Loading List of the salary...'}>
            <SalaryList />
        </Suspense>
        <SalaryForm />
        <form action={logout}>
            <button>Logout</button>
        </form>
    </div>)
}
export default DashboardPage
