const nodemailer = require("nodemailer");

const mailer = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "nsmc21129nitw@gmail.com",
      pass: "wlql expn oqkf qjmk",
    },
  });

  // Construct email message
  const mailOptions = {
    from: "nsmc21129nitw@gmail.com",
    to: email,
    subject: "OTP Verification",
    text: `Your OTP to create account is: ${otp}`,
  };

  // Send email
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
    return otp;
  } catch (error) {
    if (error.message && error.message.includes("Invalid recipient")) {
      console.log("Invalid email address:", email);
    } else {
      console.error(error);
    }
    return 0;
  }

  
};
module.exports = { mailer };
