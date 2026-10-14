'use client'
import { login } from "@/lib/actions"
import { useActionState } from "react"


const LoginPage = () => {
    const [state, action, pending] = useActionState(login,{message: ''})

    return (
        <form action={action}>
            <input type="email" name="email" placeholder="Your Email..."/>
            <input type="password" name="password" placeholder="Your Password..." />
            <div className="text-red-700">{state?.message}</div>
            <button disabled={pending}>{pending ? 'Logging...': 'Login'}</button>
        </form>
    )
}

export default LoginPage