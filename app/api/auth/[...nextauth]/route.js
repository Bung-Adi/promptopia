import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { connectToDB } from "@utils/database"
import User from "@models/user"

/*
 U need to visit : console.cloud.google.com
 - make new project > select it
 - go to menu > api & services > Oauth consent screen
 - put the project name, your email, etc
 - go to credential > create credential > Oauth ..., etc
 - copy client ID & client secret into .env

 see more @ https://next-auth.js.org/
 visit if u dont understand : 
    https://next-auth.js.org/getting-started/example
*/

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ],
    callbacks: {
        async session({session}){
            const sessionUser = await User.findOne({ email: session.user.email })
            session.user.id = sessionUser._id.toString()
            return session
        },
        async signIn({profile}){
            try {
                await connectToDB()
                // check if user already exist 
                const userExists = await User.findOne({ email: profile.email });
    
                // if not, create new user
                if (!userExists) {
                    await User.create({
                      email: profile.email,
                      username: profile.name.replace(" ", "").toLowerCase(),
                      image: profile.picture,
                    });
                }
    
                return true
            } catch (error) {
                console.log(error)
                return false
            }
        }
    }
})

export {handler as GET, handler as POST}