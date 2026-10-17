'use client'
import { useActionState } from "react"
import { addExpense } from "@/lib/actions"
import { expenseTypes } from "@/lib/schemas"

const ExpenseForm = () => {
    const [state , action, isPending] = useActionState(addExpense, {})

    return (
        <form action={action}>
            <label htmlFor="amount">Amount: </label>
            <input type="number" name="amount" id="amount" />
            <div className="text-red-700">{state.errors?.fieldErrors.amount?.[0]}</div>

            <label htmlFor="date">Date: </label>
            <input type="date" name="date" id="date"/>
            <div className="text-red-700">{state.errors?.fieldErrors.date?.[0]}</div>

            <label htmlFor="type">The type: </label>
            <select name="type" id="type">
                <option value="">Select expense type</option>
                {expenseTypes.map((type)=>(
                    <option key={type} value={type}>
                        {type}
                    </option>
                ))}
            </select>
            <div className="text-red-700">{state.errors?.fieldErrors.type?.[0]}</div>

            <button disabled={isPending}>{isPending ? 'Adding...' : 'Add'}</button>
            <div className="text-green-700">{state.message}</div>
        </form>
    )
}

export default ExpenseForm