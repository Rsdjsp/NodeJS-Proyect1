const nodemailer = require("nodemailer");
const {
  email_host,
  email_port,
  email_secure,
  email_user,
  email_password,
} = require("../database/credentials");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: email_user,
    pass: email_password,
  },
});

async function sendEmail(to, subject, text, html) {
  let info = await transporter.sendMail({
    from: "ivrs.com@gmail.com",
    to,
    subject,
    text,
    html,
  });

  console.log(info);

  return { success: true };
}

module.exports = sendEmail;
