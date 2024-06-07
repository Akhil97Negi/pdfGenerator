import { Schema, model } from "mongoose";

const userSchema = new Schema({
    userName :{type : String , required : true},
    email :{type : String, required :true },
    password :{type :String , required : true},
    role : {type : String, enum : ['admin' , 'user'], default :'user'}
})

const userModel = model("users" , userSchema);
export default userModel;