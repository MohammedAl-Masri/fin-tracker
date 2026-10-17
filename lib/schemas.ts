import { z } from 'zod'

export const signInSchema = z.object({
    email: z.email(),
    password: z.string().min(8)
})

export const signUpSchema = z.object({
    email: z.email(),
    password: z.string().min(8),
    name : z.string().min(3)
})

export const salarySchema = z.object({
    amount: z.coerce.number().int().positive(),
    date: z.coerce.date()
})

export const expenseTypes = [
    'Food','Transportation','Bill','Internet','Shopping',
                    'Electricity','Water','Healthcare','Other'
] as const

export const expenseSchema = z.object({
    amount: z.coerce.number().int().positive(),
    date: z.coerce.date(),
    type : z.enum(expenseTypes,
                {error:'Please select an expense type'})
})

