import nextAuth from "next-auth";
import CredentialProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import User from "@/models/User"
import {createMongoConnection} from "@/database/conn"

export default nextAuth({
    session : {
        strategy : 'jwt'
    },
    providers : [
        CredentialProvider({
                   name : "Credentials",
                   async  authorize(credentials,req){
                        createMongoConnection().catch(err=>{error : "Failed To Connect"})
                        //check existing 
                        const result = await User.findOne({email : credentials.email})
                        if(!result){
                            throw new Error("No user found with email , Register Please !")
                        }
                        //comparing pwds
                        const checkPassword = bcrypt.compare(credentials.password,result.password);
                        //if incorrect 
                        if(!checkPassword || result.email !==credentials.email){
                            throw  new Error("Username or password doesnt match")
                        }

                        return result;
                   }
        })
    ],
    callbacks: {
        async jwt(token, user, account, profile, isNewUser) {
          // Add isAdmin property to token only on sign in
          if (user) {
            token.isAdmin = user.isAdmin;
          }
          return token;
        },
        async session(session, token) {
          // Add isAdmin property to session
          session.user.isAdmin = token.isAdmin;
          return session;
        },
      },
})