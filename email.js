/* EMAIL FUNCTIONALITY */

const nodemailer = import('nodemailer');
let toEmail = ''; // Add from form

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'youremail@gmail.com',
      pass: 'yourpassword'
    }
});
  
const mailOptions = {
    from: EMAIL, // Add from .env
    to: toEmail,
    subject: `🎉 Welcome to Hearthly – You're on the list!`,
    text: `Hi,

Thanks for signing up! You're officially part of the Hearthly community.

We'll keep you in the loop with exclusive updates, fresh listings, and helpful tips to make your property search easier and more exciting.

If you ever have questions or want to get in touch, we're just an email away.

Talk soon,
The Hearthly Team 🏡`
};
  
transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
});