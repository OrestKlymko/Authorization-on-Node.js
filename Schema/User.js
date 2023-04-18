import {Schema,model} from "mongoose";

const User = new Schema({
    username:{type: String, unique:true, require:true},
    password:{type: String, unique:true, require:true},
})

export default model('User',User)