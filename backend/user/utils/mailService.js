const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail', // Or your preferred service
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const sendResetEmail = async (email, token) => {
    const resetUrl = `http://localhost:3000/reset-password?token=${token}`;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Password Reset Request - Praedico',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e1e1e1; border-radius: 10px;">
                <h2 style="color: #4a6cf7; text-align: center;">Praedico Global Research</h2>
                <p>Hello,</p>
                <p>You requested a password reset for your account. Please click the button below to set a new password. This link is valid for 1 hour.</p>
                <div style="text-align: center; margin: 30px 0;">
                    <a href="${resetUrl}" style="background-color: #4a6cf7; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;">Reset Password</a>
                </div>
                <p>If you did not request this, please ignore this email.</p>
                <p>Best regards,<br>The Praedico Team</p>
                <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
                <p style="font-size: 12px; color: #999; text-align: center;">© 2026 Praedico Global Research. All rights reserved.</p>
            </div>
        `
    };

    return await transporter.sendMail(mailOptions);
};

module.exports = { sendResetEmail };
