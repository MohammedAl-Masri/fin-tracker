'use client'
import { useActionState } from "react"
import { register } from "@/lib/actions"


const RegisterPage = () => {
    const [state, action, pending] = useActionState(register, {})

    return (
        <form action={action}>
            <input type="text" name="name" placeholder="Your Name..."/>
            <div className="text-red-700">{state.errors?.fieldErrors.name?.[0]}</div>
            <input type="email" name="email" placeholder="Your email..."/>
            <div className="text-red-700">{state.errors?.fieldErrors.email?.[0]}</div>
            <input type="password" name="password" placeholder="Type a password"/>
            <div className="text-red-700">{state.errors?.fieldErrors.password?.[0]}</div>
            <button disabled={pending}>
                {pending ? 'Registering...' : 'Register'}
            </button>
        </form>
    )
}

export default RegisterPage