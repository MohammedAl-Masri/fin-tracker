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

export const expenseSchema = z.object({
    amount: z.coerce.number().int().positive(),
    date: z.coerce.date(),
    type : z.
})

