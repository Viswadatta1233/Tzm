const nodemailer = require('nodemailer');

// Create a transporter using SMTP (Gmail in this case)
const transporter = nodemailer.createTransport({
    service: 'gmail',  // Using Gmail as the service
    auth: {
        user: 'dattanidumukkala.98@gmail.com', // Replace with your email
        pass: 'ryoz vwuz iial mqfy'  // Use App Password (not the actual email password)
    }
});

const sendMail = async (from, to, subject, text) => {
    const mailOptions = {
        from,  // The user's email address
        to,    // Admin email address
        subject,
        text
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Message sent');
    } catch (error) {
        console.error('Error sending email: ', error);
    }
};

module.exports = sendMail;
