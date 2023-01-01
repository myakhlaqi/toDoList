require('dotenv').config()
const Mailjet = require('node-mailjet');


const mailjet = new Mailjet({
    apiKey: process.env.MJ_APIKEY_PUBLIC ,
    apiSecret: process.env.MJ_APIKEY_PRIVATE 
});

const request = mailjet
    .post('send', { version: 'v3.1' })
    .request({
        Messages: [
            {
                From: {
                    Email: "yahya.akhlaghi@gmail.com",
                    Name: "Yahya Akhlaqi"
                },
                To: [
                    {
                        Email: "yahya.akhlaghi@gmail.com",
                        Name: "Yahya Akhlaqi"
                    }
                ],
                Subject: "Test mailjet api message",
                TextPart: "Dear passenger 1, welcome to Mailjet! May the delivery force be with you!",
                HTMLPart: "<h3>Dear passenger 1, welcome to <a href=\"https://www.mailjet.com/\">Mailjet</a>!</h3><br />May the delivery force be with you!"
            }
        ]
    })

request
    .then((result) => {
        // console.log(result.body)
        console.log(result.Messages)
    })
    .catch((err) => {
        // console.log(err.statusCode)
        console.log("error: " + err.message)
    })