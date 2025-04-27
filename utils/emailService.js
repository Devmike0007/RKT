const nodemailer = require('nodemailer');
const config = require('../config/config');

const transporter = nodemailer.createTransport({
    service: config.emailConfig.service,
    auth: {
        user: config.emailConfig.user,
        pass: config.emailConfig.pass
    }
});

exports.sendContactNotification = async (contact) => {
    try {
        const mailOptions = {
            from: config.emailConfig.user,
            to: config.emailConfig.user,
            subject: `New Contact Form Submission: ${contact.subject}`,
            text: `
                You have a new contact form submission:
                
                Name: ${contact.name}
                Email: ${contact.email}
                Phone: ${contact.phone}
                Subject: ${contact.subject}
                Message: ${contact.message}
            `,
            html: `
                <h2>New Contact Form Submission</h2>
                <p><strong>Name:</strong> ${contact.name}</p>
                <p><strong>Email:</strong> ${contact.email}</p>
                <p><strong>Phone:</strong> ${contact.phone}</p>
                <p><strong>Subject:</strong> ${contact.subject}</p>
                <p><strong>Message:</strong></p>
                <p>${contact.message}</p>
            `
        };

        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Email sending error:', error);
    }
};

exports.sendResponseToContact = async (contact, response) => {
    try {
        const mailOptions = {
            from: config.emailConfig.user,
            to: contact.email,
            subject: `Re: ${contact.subject}`,
            text: response,
            html: `<p>${response.replace(/
/g, '<br>')}</p>`
        };

        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Email sending error:', error);
    }
};