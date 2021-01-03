var nodemailer = require("nodemailer");
/*
	Here we are configuring our SMTP Server details.
	STMP is mail server which is responsible for sending and recieving email.
*/
smtpTransport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
        user: 'meriem919@gmail.com', 
        pass: 'mimitadsl :D5'
    }
});

module.exports = smtpTransport;
/*------------------SMTP Over-----------------------------*/
