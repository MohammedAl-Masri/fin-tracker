'use client'
import { addSalary } from "@/lib/actions"
import { useActionState } from "react"

const SalaryForm = () => {
    const [state, action, isPending] = useActionState(addSalary, {})

    return (
        <div>
            <h2 className="font-bold text-2xl text-gray-800 mx-10">Add Salary</h2>
            <form action={action} className="flex flex-col m-10 p-5 rounded-lg
                                            shadow-lg shadow-gray-700/30">
                <label htmlFor="amount">Amount: </label>
                <input id="amount" type="number" name="amount"
                className="outline-none p-3 focus:shadow-lg rounded-lg"/>
                <div>{state.errors?.fieldErrors.amount?.[0]}</div>
                <label htmlFor="date">Date: </label>
                <input id="date" type="date" name="date" className="outline-none p-3"/>
                <div>{state.errors?.fieldErrors.date?.[0]}</div>
                <button disabled={isPending} className="p-2 mx-auto mt-5 rounded-lg text-white text-lg font-bold
                                                        bg-green-600 w-40 hover:scale-105 transition" 
                                                        >{isPending ? 'Adding...' : 'Add'}</button>
                <div>{state.message}</div>
            </form>
        </div>
    )
}

export default SalaryForm