const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
  service: 'hotmail',
  port: 587,    
  secure: false, 
  auth: {
    user: "tuneemporium@outlook.com",
    pass: "Emporiumtune22",
  },
  
});

exports.sendEmail = async (emailContent, sendTo) => {
  const mailOptions = {
    from: "tuneemporium@outlook.com",
    to: sendTo,
    subject: emailContent.subject,
    html: emailContent.body,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ', info);
  } catch (error) {
    console.error('Error sending email: ', error);
  }
};
