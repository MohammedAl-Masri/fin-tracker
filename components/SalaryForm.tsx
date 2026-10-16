'use client'
import { addSalary } from "@/lib/actions"
import { useActionState } from "react"

const SalaryForm = () => {
    const [state, action, isPending] = useActionState(addSalary, {})

    return (
        <form action={action}>
            <label htmlFor="amount">Amount: </label>
            <input id="amount" type="number" name="amount"/>
            <div>{state.errors?.fieldErrors.amount?.[0]}</div>
            <label htmlFor="date">Date: </label>
            <input id="date" type="date" name="date" />
            <div>{state.errors?.fieldErrors.date?.[0]}</div>
            <button disabled={isPending}>{isPending ? 'Adding...' : 'Add'}</button>
            <div>{state.message}</div>
        </form>
    )
}

export default SalaryForm