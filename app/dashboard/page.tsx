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
        <h1 className="text-3xl font-bold text-gray-800 py-4 text-center">Welcome {session.user?.name} </h1>
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
        <div>
            <h2 className="font-bold text-2xl text-gray-800 mx-10">Salary History</h2>
            <table className="w-full text-center">
                <thead>
                    <tr className="border-b">
                    <th className="px-4 py-3 ">Salary</th>
                    <th className="px-4 py-3 ">Date</th>
                    </tr>
                </thead>
                <tbody>
                    {salary.map((i) => (
                    <tr key={i.id} className="border-b">
                        <td className="px-4 py-3">{i.amount}</td>
                        <td className="px-4 py-3">
                        {i.date.toLocaleDateString()}
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
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
        <div className="w-full mb-10">
            <h2 className="mb-4 text-2xl font-bold mx-10 my-5 text-gray-800">
                Expense History
            </h2>
            <table className="w-85 rounded-xl bg-black/30 backdrop-blur-sm mx-auto ">
                <thead>
                        <tr className="border-b border-white/20">
                            <th className="py-3">Amount</th>
                            <th className="py-3">Date</th>
                            <th className="py-3">Type</th>
                        </tr>
                </thead>
                <tbody>
                    {expense.map((i) => (
                        <tr key={i.id} className="border-b border-white/10 text-center">
                            <td className="py-3 px-3">{i.amount}</td>
                            <td className="py-3 px-3">
                                {i.date.toLocaleDateString()}
                            </td>
                            <td className="py-3 px-3">{i.type}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
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
        <div className="mx-10 mb-10">
            <div className="bg-gray-400 rounded-l-lg p-5 mb-5">
                <div className="font-bold text-green-600">Total Salary:
                    <span className="text-black pl-3">{totalSalary} $</span></div>
            </div>
            <div className="bg-gray-400 rounded-l-lg p-5 mb-5">
                <div className="font-bold text-red-700">Total Expense:
                    <span className="text-black pl-3">{totalExpense} $</span></div>
            </div>
            <div className="bg-gray-400 rounded-l-lg p-5 mb-5">
                <div className="font-bold text-gray-800 ">The final amount:
                    <span className="text-black pl-3">{balance} $</span></div>
            </div>
        </div>
    )
}


const DashboardPage = () => {
    return(
    <div className="bg-gradient-to-r from-gray-300 to-gray-400">
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
            <button className="font-bold p-3 m-3 bg-red-700 test-2xl hover:scale-105 rounded-t-lg text-white
                                transition m-auto w-full">Logout</button>
        </form>
    </div>)
}
export default DashboardPage
