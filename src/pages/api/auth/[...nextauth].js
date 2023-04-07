import nextAuth from "next-auth";
import CredentialProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import User from "@/models/User"
import {createMongoConnection} from "@/database/conn"

//import jwt  from "jsonwebtoken"

export default nextAuth({
    session : {
        
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
                        const checkPassword = await bcrypt.compare(credentials.password,result.password);
                        //if incorrect 
                        if(!checkPassword || result.email !==credentials.email){
                            throw  new Error("Username or password doesnt match")
                        }
                        console.log("result in Authorize ",result)
                        // Generate JWT token with user data

                        
  /** const token = jwt.sign(
    { 
      user: { 
        _id: result._id,
        email: result.email,
        username: result.username,
        isAdmin: result.isAdmin
      }
    },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );

           console.log('token in server :', token);
          const user = { ...result.toObject(), token };
          console.log('user in server :', user);
          */
           return result;}
        })
    ],
   /**  callbacks: {
      async jwt(token, user) {
        if (user) {
          token.accessToken = user.token;
        }
        return token;
      },
      async session(session, token) {
        session.accessToken = token.accessToken;
        console.log("session with AcessToken :",session);
        return session;
      },
    },*/
    
});