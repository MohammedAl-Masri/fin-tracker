'use server'
import { expenseSchema, salarySchema, signUpSchema } from "./schemas"
import { z } from "zod"
import { prisma } from '@/lib/db'
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

type FormState ={
    message?: string,
    errors?:
            {formErrors: string[],
            fieldErrors : {
            amount?: string[],
            date?: string[],
            type?: string[]
    }}
}

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

export const addSalary = async(prevState : unknown, formData : FormData) : Promise<FormState> =>{
    const session = await auth()

    if(!session?.user?.id){ 
        return { message :`You have to sign in!`}
    }

    const data = Object.fromEntries(formData)

    const result = salarySchema.safeParse(data)
    if(!result.success){
        return {errors: z.flattenError(result.error)}
    }

    try{
        await prisma.salary.create({
            data:{
                date: result.data.date,
                amount: result.data.amount,
                userId: Number(session.user.id)
            }
        })
    }catch(error){
        console.error(error)
        return {
            message : 'Failed to add salary'
        }
    }

    revalidatePath('/dashboard')

    return {
        message: 'Salary added successfully!'
    }
}

export const addExpense = async(prevState : unknown, formData : FormData) : Promise<FormState> =>{
    const session = await auth()
    if(!session?.user?.id) {
        return { message :`You have to sign in!`}
    }
    const data = Object.fromEntries(formData)
    const result = expenseSchema.safeParse(data)
    if(!result.success){
        return {errors: z.flattenError(result.error)}
    }
    try{
        await prisma.expense.create({
            data:{
                amount: result.data.amount,
                date: result.data.date,
                type: result.data.type,
                userId: Number(session.user.id)
            }
        })
    }catch(error){
        console.error(error)
        return{
            message : 'Failed to add expense!'
        }
    }

    revalidatePath('/dashboard')

    return {
        message : 'Expense added successfully!'
    }
}
