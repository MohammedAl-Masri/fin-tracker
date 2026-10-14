'use server'
import { signUpSchema } from "./schemas"
import { z } from "zod"
import { prisma } from '@/lib/db'
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";

export type RegisterState  = {
    errors?: {
        fieldErrors: {
            name?: string[],
            password?: string[],
            email?: string[]
        }
    }
}

export const register = async(prevState : unknown, formData : FormData) : Promise<RegisterState> =>{
    const data = Object.fromEntries(formData)

    const result = signUpSchema.safeParse(data)
    if(!result.success) return {
        errors: z.flattenError(result.error)
    }

    const { email, password, name } = result.data
    const existing = await prisma.user.findUnique({where:{email}})
    if(existing) return{
        errors : {fieldErrors: {email: ['You have already account!']} }
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    await prisma.user.create({
        data:{
            password: hashedPassword,
            name,
            email
        }
    })

    redirect('/login')
}

export const login = async (prevState : unknown, formData : FormData)=>{
    formData.set('redirectTo', "/dashboard")
    try{
        await signIn('credentials', formData)
    }catch(error){
        if(error instanceof AuthError){
            return { message :'The email or the password is wrong!'}
        }
        throw error
    }
}

export const logout = async()=>{
    await signOut({redirectTo: '/login'})
}