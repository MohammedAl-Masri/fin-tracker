'use client'
import { ResponsiveContainer, BarChart, XAxis, YAxis, Bar, Tooltip } from "recharts"

type ChartItem ={
    name : string,
    total : number
}

const ExpenseChart = ({data} : {data : ChartItem[]}) => {
    if(data.length === 0){
        return <div>You don&apos;t have any expenses yet!</div>
    }

    return (
        <ResponsiveContainer width='90%' height={300}>
            <BarChart data={data}>
                <XAxis dataKey='name' />
                <YAxis />
                <Tooltip formatter={(v)=> `${v} SAR`} />
                <Bar dataKey='total' fill="green" />
            </BarChart>
        </ResponsiveContainer>
    )
}

export default ExpenseChart