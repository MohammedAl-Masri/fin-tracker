'use server'
import { signUpSchema } from "./schemas"
import { z } from "zod"
import { prisma } from '@/lib/db'
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

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