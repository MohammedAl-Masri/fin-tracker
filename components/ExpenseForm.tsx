'use client'
import { useActionState } from "react"
import { addExpense } from "@/lib/actions"
import { expenseTypes } from "@/lib/schemas"

const ExpenseForm = () => {
    const [state , action, isPending] = useActionState(addExpense, {})

    return (
        <div>
            <h2 className="font-bold text-2xl text-gray-800 mx-10">Add Expenses</h2>
            <form action={action} className="flex flex-col m-10 p-5 rounded-lg
                                            shadow-lg shadow-gray-700/30">
                <label htmlFor="amount">Amount: </label>
                <input type="number" name="amount" id="amount" className="outline-none p-3 focus:shadow-lg rounded-lg"/>
                <div className="text-red-700">{state.errors?.fieldErrors.amount?.[0]}</div>

                <label htmlFor="date">Date: </label>
                <input type="date" name="date" id="date" className="outline-none p-3 focus:shadow-lg rounded-lg"/>
                <div className="text-red-700">{state.errors?.fieldErrors.date?.[0]}</div>

                <label htmlFor="type">The type: </label>
                <select name="type" id="type" className="outline-none p-3 focus:shadow-lg rounded-lg">
                    <option value="">Select expense type</option>
                    {expenseTypes.map((type)=>(
                        <option key={type} value={type}>
                            {type}
                        </option>
                    ))}
                </select>
                <div className="text-red-700">{state.errors?.fieldErrors.type?.[0]}</div>

                <button disabled={isPending} className="p-2 mx-auto mt-5 rounded-lg text-white text-lg font-bold
                                                        bg-green-600 w-40 hover:scale-105 transition" >
                        {isPending ? 'Adding...' : 'Add'}</button>
                <div className="text-green-700">{state.message}</div>
            </form>
        </div>
    )
}

export default ExpenseForm