import mongoose, { Schema, model } from "mongoose"

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    inventory: {
        type: [{testId:{type: Schema.Types.ObjectId, ref:"tests"}, choicess:[String], purchaseDate: Date, startDate:Date, finishDate:Date}]
    },
    name: String,
    surname: String,
    birthday: Date,
    major: String,
    university: String,
}, {timestamps:true})

userSchema.index({username:1})

const User = mongoose.models.User || model("users", userSchema);

export default User;