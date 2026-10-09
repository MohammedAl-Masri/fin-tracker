import NextAuth from "next-auth"; 
import Credentials from "next-auth/providers/credentials";
import {signInSchema} from "@/lib/schemas"
import {prisma} from '@/lib/db'
import bcrypt from "bcryptjs";


export const {signIn, signOut, auth, handlers} = NextAuth({
    providers:[Credentials({
        authorize: async(credentials)=>{
            const parsed = signInSchema.safeParse(credentials)
            if(!parsed.success) return null

            const{email, password} = parsed.data

            const user = await prisma.user.findUnique({where:{email}})
            if(!user) return null
            
            const isValid = await bcrypt.compare(password, user.password)
            if(!isValid) return null

            return {email: user.email, name:user.name, id: String(user.id)}
        }
    })],
    pages:{
        signIn: '/login'
    }
})