import nodemailer from 'nodemailer';
import hbs from 'nodemailer-express-handlebars';
import dotenv from 'dotenv';
dotenv.config();

const sendEmail = async (data) => {
    let transporter = nodemailer.createTransport({
        service: "gmail",
        port: 587,
        secure: false,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS
        }
    });

    transporter.use('compile', hbs({
        viewEngine: 'nodemailer-express-hbs',
        viewPath: 'template'
    }))

    let mailOptions = {
        from: process.env.MAIL_USER,
        to: data.email,
        subject: data.subject,
        template: data.template,
        context: {
            name: data.name,
            token: data.token
        }
    }

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) { console.log(err) } 
        else return true;
    })
}

export default sendEmail;