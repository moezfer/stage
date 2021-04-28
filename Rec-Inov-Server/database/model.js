const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const question = mongoose.model("Question",new Schema({
    Question: String,
    Options: [],
    CorrectAnswerNo: Number,
    Type: String
}),"Question");

const user = mongoose.model("Users",new Schema({
    Name: String,
    Password: String,
    Email: { type:String, unique: true },
    Type: String,
    Branch: String
}),"Users");




exports.user = user;
exports.question = question;
