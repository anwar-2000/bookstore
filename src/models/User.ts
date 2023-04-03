import { Schema, models, model } from "mongoose";
import bcrypt from "bcryptjs"

interface UserPattern {
    username : string;
    email : string;
    password : string;
}

const UserSchema : Schema<UserPattern> = new Schema({
    username : String ,
    email : String ,
    password : String,
})

UserSchema.pre('save', async function(next) {
    if(!this.isModified('password')){
        next()
    }
    this.password = await bcrypt.hash(this.password, 10)
})

const User = models.User || model('User',UserSchema)
export default User