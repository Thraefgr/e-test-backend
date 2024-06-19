import mongoose, { Schema, model } from "mongoose";

const testSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    timeLimit: {
        type: Number,
        required: true
    },
    questions: {
        type: [{
            question: String,
            choices: [String],
            choice: {type:String, default:null|""},
            answer: String,
            points: Number
        }],
        required: true
    },
    creator: {
        type: String, 
        ref: "users", 
        required: true
    }
}, {timestamps:true})

const Test = mongoose.models.Test || model("tests", testSchema);

export default Test;