import { Model } from "mongoose";
import mongoose from "~/mongoose.server";

export interface UserInterface{
    email:string,
    password : string
}

const LoginSchema = new mongoose.Schema({
    // destructuring the input 
    email : {
        type : String,
        require: true,
    },

    password: {
        type: String,
        require: true
    }
})

let Login: mongoose.Model<UserInterface>;

try {
    Login = mongoose.model<UserInterface>("login");
} catch (error) {
    Login = mongoose.model<UserInterface>("login", LoginSchema);
}

export default Login