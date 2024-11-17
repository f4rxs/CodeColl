const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USERNAME,  
    pass: process.env.MAIL_PASSWORD,  
  },
});

const mailingService = {
  async sendVerificationMail(to, id, verificationToken) {
    const verificationUrl = `http://localhost:5000/auth/verify-email/${id}/${verificationToken}`;
    const subject = 'Verify Your Email';
    const html = `
    <div style="background-color: #000; color: #0f0; font-family: 'Courier New', Courier, monospace; padding: 20px;">
      <h2 style="text-align: center; border-bottom: 2px solid #0f0; padding-bottom: 10px;">SECURE EMAIL VERIFICATION</h2>
      <p style="font-size: 1.2em; text-align: center;">
        Initiating authentication protocol...<br><br>
        Access code granted for email verification.<br><br>
        <strong>To confirm your identity,</strong> please click the link below:
      </p>
      <p style="text-align: center;">
        <a href="${verificationUrl}" style="color: #00ff00; font-size: 1.2em; text-decoration: none; border: 2px solid #0f0; padding: 10px; display: inline-block;">
          VERIFY ACCESS
        </a>
      </p>
      <p style="font-size: 1.2em; text-align: center;">
        If you didn't request this verification, initiate countermeasures immediately.
      </p>
      <hr style="border: 1px solid #0f0;">
      <p style="text-align: center; font-size: 0.9em;">
        <em>Security Node #4096<br>Verifying agent: 0xA9B24C</em>
      </p>
    </div>
  `;

    await transporter.sendMail({
      from: process.env.MAIL_USERNAME,
      to,
      subject,
      html,
    });
  },

  //not implemented yet
  async sendResetPasswordMail(to, resetToken) {
    const resetUrl = `http://localhost:5000/reset-password/${resetToken}`;
    const subject = 'Reset Your Password';
    const html = `<p>Click <a href="${resetUrl}">here</a> to reset your password.</p>`;

    await transporter.sendMail({
      from: process.env.MAIL_USERNAME,
      to,
      subject,
      html,
    });
  },
};

module.exports = mailingService;
