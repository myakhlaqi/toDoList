require('dotenv').config()
// console.log(process.env)
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const https = require('https');

app.set('view engine', 'ejs');
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) { res.sendFile(__dirname + '/signup.html'); });

app.post("/", function (req, res) {
    // console.log(newUser);
    // const jsonData = JSON.stringify(newUser);
    // console.log(jsonData );
    const newMember = {
        full_name: req.body.fname + " " + req.body.lname,
        email_address: req.body.email,
        status: "subscribed",
        skip_merge_validation: 'true'
    };

    // create the mailchimp API call
    const option = {
        auth: "USERNAME" + ':' + process.env.MAILCHIP_API_KEY,
        method: "POST",
        hostname: "us17.api.mailchimp.com",
        path: "/3.0/lists/" + process.env.AUDIANC_ID + "/members",
        port: 443
    }
    // const url = "https://us17.api.mailchimp.com/3.0/lists/"+process.env.AUDIANC_ID+"/members"
    const https_req = https.request(option, function (response) {

        response.on("data", function (data) {
            if (response.statusCode === 200) {
                console.log(data);
                res.render('success', { feedback: JSON.parse(data).status });
            }
            else {
                res.render('failure', { feedback: JSON.parse(data).detail });
                // res.sendFile(__dirname + "/failure.html");

            }

            // console.log(JSON.parse(data));
        });

    });
    https_req.write(JSON.stringify(newMember))
    https_req.end();
    // request module is deprecated  so we replace it with https nodejs module instead


    // const request = require('request');

    // const options = {
    //     method: 'POST',
    //     url: 'https://us17.api.mailchimp.com/3.0/lists/665c9e3cb1/members',
    //     headers: {
    //         Accept: '*/*',
    //         'User-Agent': 'Thunder Client (https://www.thunderclient.com)',
    //         // Authorization: 'Basic eWFoeWE6YTRiYzM1ZmZlZmU5M2E4MDhiZDcwODc0MmJkNDcwNTYtdXMxNw==',
    //         Authorization: "USERNAME"+':'+process.env.MAILCHIP_API_KEY,
    //         'Content-Type': 'application/json'
    //     },
    //     body: {
    //         full_name: req.body.fname +" "+req.body.lname,
    //         email_address: req.body.email,
    //         status: "subscribed",
    //         skip_merge_validation: 'true'
    //         },
    //     json: true
    // };

    // request(options, function (error, response, body) {
    //     if (error) throw new Error(error);
    //     console.log(response);
    //     if (response.statusCode === 200 ) 
    //         res.sendFile(__dirname+"/success.html");
    //     else
    //         res.sendFile(__dirname+"/failure.html");

    // });

}
);


app.post("/success", function (req, res) {
    // res.sendFile(__dirname+'/signup.html')
    res.redirect("/");
    console.log("success");
});

app.post("/failure", function (req, res) {
    // res.sendFile(__dirname+'/signup.html')
    res.redirect("/");
    console.log('failure');
});


app.listen(process.env.PORT || 3001, () => {
    console.log('server is running on port http://localhost:3001');
});

