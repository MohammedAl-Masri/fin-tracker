'use client'
import { login } from "@/lib/actions"
import { useActionState } from "react"


const LoginPage = () => {
    const [state, action, pending] = useActionState(login,{message: ''})

    return (
        <div className="bg-gradient-to-r from-gray-300 to-gray-400 min-h-[calc(100vh-65px)] flex justify-center algin-center
                        flex-col text-center">
            <div className="m-10 p-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl">
                <h2 className="font-bold text-3xl p-5">Hello There.</h2>
                <form action={action}>
                    <input type="email" name="email" placeholder="Your Email..." className="outline-none
                    my-4"/>
                    <input type="password" name="password" placeholder="Your Password..." className="
                    outline-none my-4"/>
                    <div className="text-red-700">{state?.message}</div>
                    <button disabled={pending} className="rounded-lg mt-2 px-5 py-2 bg-gray-800
                    text-white hover:scale-105 transition">{pending ? 'Logging...': 'Login'}</button>
                </form>                
            </div>

        </div>
    )
}

export default LoginPage