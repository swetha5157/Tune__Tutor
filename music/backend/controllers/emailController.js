const generateEmailBody=require('../nodemailer/mailTemplate.js');
const sendEmail = require('../nodemailer/mailer.js');

exports.sendNotification = async (req, res) => {
  const { instrument, type, recipients } = req.body;

  try {
    const emailContent = generateEmailBody(instrument, type);
    await sendEmail(emailContent, recipients);
    res.status(200).json({ message: 'Notification sent successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send notification' });
  }
};