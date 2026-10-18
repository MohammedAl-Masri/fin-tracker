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
        <Suspense fallback={'Loading...'}>
            <ExpenseChartData />
        </Suspense>
    )
}

export default StatsPage