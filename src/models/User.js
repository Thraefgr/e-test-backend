import mongoose, { Schema, model } from "mongoose"

const userSchema = new Schema({
    e_mail: {
        type: String,
        unique: true,
        required: true,
    },
    role: {
        type: String,
        required: true
    },
    name: String,
    surname: String,
    birthday: Date,
    major: String,
    university: String,
}, {timestamps:true})

userSchema.index({e_mail:1})

const User = mongoose.models.User || model("users", userSchema);

export default User;