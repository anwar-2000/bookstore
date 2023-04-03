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
                    async authorize(credentials,req){

                        try {
                            await createMongoConnection();
                          } catch (err) {
                            res.status(500).json({ error: "Error in the connection" });
                            return;
                          }

                        const {email,password} = credentials;
                          console.log(email,password)
                        const user = await User.findOne({email})

                        if(!user){
                            throw new Error("Invalid email or password")
                        }

                        const IsPasswordMatch = await bcrypt.compare(password,user.password);
                        
                        if(!password){
                            throw new Error("Invalid email or password")
                        }

                        return user ;

                    }
        })
    ]
})