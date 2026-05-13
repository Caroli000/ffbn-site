const nodemailer = require('nodemailer');

class MailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });
    }

    async sendContactEmail(data) {
        const { name, email, message } = data;

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: 'ffbn.asso@gmail.com', // Destination demandée par l'utilisateur
            subject: `Nouveau message de contact - ${name}`,
            text: `Nom: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
            html: `
                <h3>Nouveau message de contact</h3>
                <p><strong>Nom :</strong> ${name}</p>
                <p><strong>Email :</strong> ${email}</p>
                <p><strong>Message :</strong></p>
                <p>${message.replace(/\n/g, '<br>')}</p>
            `,
            replyTo: email
        };

        try {
            await this.transporter.sendMail(mailOptions);
            return true;
        } catch (error) {
            console.error('Erreur lors de l\'envoi de l\'email:', error);
            throw error;
        }
    }
}

module.exports = new MailService();
