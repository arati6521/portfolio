//creates routes through express

const express = require('express');
const bodyparser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
app.use(express.static("images"));
app.use(bodyparser.urlencoded({extended: true}));


app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
    console.log(__dirname);
});


//callback function
app.post("/", function(req, res){
    const comm = req.body.message;
    const na = req.body.nameofperson;
    
    var transpoter = nodemailer.createTransport({
        service: 'gmail', 
        auth: {
            user: 'arati6521@gmail.com',
            pass: 'Ad@65210' //fake password 
        }
    })

    var mailOptions = {
        from: 'arati6521@gmail.com',
        to: req.body.username,
        cc: 'arati6521@gmail.com',
        subject: 'Thanks for giving feedback' + na,
        text: 'Thanks for your message, you have sent to us -->' + comm
    };

    transpoter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
        }else{
           // res.send("mail submitted");
            res.redirect('/');
            console.log("Email sent" + info.response);
        }
    })
});


app.listen(3000, function(){
    console.log("server started at 3000");
})