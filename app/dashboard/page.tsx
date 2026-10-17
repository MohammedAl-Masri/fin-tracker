import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { Suspense } from "react"
import { logout } from "@/lib/actions"
import SalaryForm from "@/components/SalaryForm"
import { prisma } from "@/lib/db"
import ExpenseForm from "@/components/ExpenseForm"

const WelcomeMessage = async()=>{
    const session = await auth()
    if(!session) redirect('/login')
    return (
        <h1>Welcome {session.user?.name}</h1>
    )
}
const SalaryList = async()=>{
    const session = await auth()
    if(!session?.user?.id) redirect('/login')   
    const userId = Number(session.user?.id)
    const salary = await prisma.salary.findMany({
        where:{userId},
        orderBy:{
            date: 'desc'
        }
    })
    if(salary.length === 0){
        return <p className="text-red-700">You don&apos;t have any salary yet!</p>
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

const ExpenseList = async()=>{
    const session = await auth()
    if(!session?.user?.id) redirect('/login')
    const userId = Number(session.user.id)
    const expense = await prisma.expense.findMany({
        where:{userId},
        orderBy:{
            date: 'desc'
        }
    })
    if(expense.length === 0){
        return <p className="text-red-700">You don&apos;t have any expense yet!</p>
    }

    return(
        <div className="border">{expense.map((i)=>(
            <div key={i.id}>
                <div>Amount: {i.amount}</div>
                <div>Date: {i.date.toLocaleDateString()}</div>
                <div>Type: {i.type}</div>
            </div>
        ))}</div>
    )
}

const Totals = async()=>{
    const session = await auth()
    if(!session?.user?.id) redirect('/login')
    const userId = Number(session.user.id)

    const [Salary, Expense] = await Promise.all([
        prisma.salary.aggregate({
            where:{userId},
            _sum:{
                amount: true
            }
        }),
        prisma.expense.aggregate({
        where:{userId},
            _sum:{
                amount: true
            }
        })
    ])

    const totalSalary = Salary._sum.amount ?? 0
    const totalExpense = Expense._sum.amount ?? 0

    const balance =  totalSalary - totalExpense

    return (
        <div className="border border-red-600">
            <div>Total Salary: {totalSalary}</div>
            <div>Total Expense: {totalExpense}</div>
            <div>The final amount: {balance}</div>
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
        <Suspense fallback={'Loading list of the expense...'}>
            <ExpenseList />
        </Suspense>
        <Suspense>
            <Totals />
        </Suspense>
        <SalaryForm />
        <ExpenseForm />
        <form action={logout}>
            <button>Logout</button>
        </form>
    </div>)
}
export default DashboardPage
