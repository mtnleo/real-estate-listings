/* EMAIL FUNCTIONALITY */

import nodemailer from 'nodemailer';
let toEmail = ''; // Add from form
console.log(process.env.BREVO_SMTP_KEY);
const emailBody = `
<div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f7f7f7; color: #333;">
  <h2 style="color: #3e4e41;">Welcome to Hearthly! 🪴</h2>
  <p>Hey there!</p>
  <p>Thanks for signing up. You're now part of a cozy little space where we’re building something warm and meaningful.</p>
  <p>We’ll keep you posted with updates. Until then, sit back and relax — you’re on the list.</p>
  <p style="margin-top: 30px;">– The Hearthly Team</p>
</div>
`

const transporter = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com',
    port: 587,
    auth: {
      user: '8c149b001@smtp-brevo.com', 
      pass: process.env.BREVO_SMTP_KEY,
    },
});
  
const mailOptions = {
    from: '"Hearthly Team" hello.hearthly@gmail.com', // Add from .env
    to: toEmail,
    subject: `🎉 Welcome to Hearthly – You're on the list!`,
    html: emailBody
};
  


export async function sendEmail(newEmail) {
  mailOptions.to = newEmail;

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  }); 
}