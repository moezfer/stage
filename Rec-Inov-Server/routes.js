var express = require("express");
var router = express.Router();
var {result, user, question, test} = require('./database/model.js');
var nodemailer = require('nodemailer');

router.get("/", (req, res) => {
    res.end("Quiz Builder API!")
})

router.post("/loginUser", (req, res) => {
    user.find({
        Email: req.body.Email,
        Password: req.body.Password
    })
        .then((data) => {
            if (data.length) {
                res.end(JSON.stringify(data[0]));
            }
            else
                res.end("false");
        })
        .catch((err) => {
            console.log("Error While logging in User: ", err);
            res.end("false");
        });
});

router.post("/registerUser", (req, res) => {
    user.create({
        Name: req.body.Name,
        Password: req.body.Password,
        Email: req.body.Email,
        Type: req.body.Type,
        Branch: req.body.Branch
    })
        .then((data) => {
            res.end(JSON.stringify({
                status: true
            }));
        })
        .catch((err) => {
            if(err.code === 11000)
                console.log("Error while registering user: need unique email");
            else 
                console.log("Error while registering user: ", err);
            res.end(JSON.stringify({
                status: false,
                errCode: err.code
            }));
        })
});

router.post("/addQuestion", (req, res) => {
    question.create({
        Question: req.body.Question,
        CorrectAnswerNo: req.body.CorrectAnswerNo,
        Options: req.body.Options,
        Type: req.body.Type
    })
        .then((data) => {
            res.end(JSON.stringify(data));
        })
        .catch((err) => {
            console.log("Error While adding Question: ", err);
            res.end("[]");
        })
});




module.exports = router;