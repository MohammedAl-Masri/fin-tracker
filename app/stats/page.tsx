import { auth } from "@/auth"
import ExpenseChart from "@/components/ExpenseChart"
import { prisma } from "@/lib/db"
import { redirect } from "next/navigation"
import { Suspense } from "react"

const ExpenseChartData = async() => {
    const session = await auth()
    if(!session?.user?.id) redirect('/login')
    const userId = Number(session.user.id)

    const grouped = await prisma.expense.groupBy({
        where:{userId},
        by:['type'],
        _sum:{
            amount: true
        }
    })

    const chartData  = grouped.map( i => ({
        name : i.type,
        total : i._sum.amount ?? 0
    }))

    return (
        <ExpenseChart data={chartData} />
    )
}

const StatsPage = () => {
    return (
        <div className="bg-gradient-to-r from-gray-300 to-gray-400 min-h-[calc(100vh-65px)]">
            <h1 className="md:text-5xl font-bold text-center md:pt-10 text-gray-800">Stats</h1>
            <div className="md:mx-30 md:py-30">  
                <Suspense fallback={'Loading...'}>
                    <ExpenseChartData />
                </Suspense>            
            </div>

        </div>
    )
}

export default StatsPage