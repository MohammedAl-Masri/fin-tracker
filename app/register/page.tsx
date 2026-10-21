"use client";
import { useActionState } from "react";
import { register } from "@/lib/actions";

const RegisterPage = () => {
    const [state, action, pending] = useActionState(register, {});

    return (
        <div className="bg-gradient-to-r from-gray-300 to-gray-400 min-h-[calc(100vh-65px)]
                        flex justify-center algin-center flex-col text-center">
            <div className="m-10 p-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl
            md:w-120 md:m-auto md:h-120">
                <h2 className="font-bold text-3xl
                md:text-5xl md:pb-5">Create Account</h2>
                <form action={action} className='m-auto md:flex md:flex-col'>
                    <input type="text" name="name" placeholder="Your Name..." className="outline-none my-4 px-3 py-2
                    md:text-2xl md:focus:border-b-5 transition"/>
                    <div className="text-red-700">{state.errors?.fieldErrors.name?.[0]}</div>
                    <input type="email" name="email" placeholder="Your Email..." className="outline-none my-4 px-3 py-2
                    md:text-2xl md:focus:border-b-5 transition"/>
                    <div className="text-red-700">{state.errors?.fieldErrors.email?.[0]}</div>
                    <input type="password" name="password" placeholder="Type a password..." className="outline-none my-4 px-3 py-2
                    md:text-2xl md:focus:border-b-5 transition md:pb-5"/>
                    <div className="text-red-700">{state.errors?.fieldErrors.password?.[0]}</div>
                    <button disabled={pending} className="rounded-lg mt-2 px-5 py-2 bg-gray-800 text-white md:text-3xl
                                hover:scale-105 transition">
                    {pending ? "Registering..." : "Register"}
                    </button>
                </form>
            </div>                
        </div>
        );
};

export default RegisterPage;
