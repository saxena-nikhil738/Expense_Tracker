const { mailer } = require("../Helpers/sendEmail");
const OtpModel = require("../models/OtpModel");

const userModel = require("../models/userModel");

const emailSendController = async (req, res) => {
  try {
    const { email } = req.body;
    let data = await userModel.findOne({ email });
    if (data) {
      let otpcode = Math.floor(Math.random() * 10000 + 1);
      let optpdata = new OtpModel({
        email,
        code: otpcode,
        expireIn: new Date().getTime() + 300 * 1000,
      });
      let otpResponse = await optpdata.save();
      mailer(email, otpcode);
      return res.status(201).send({
        success: true,
        message: "otp sent to the email please check your mail",
        optpdata,
      });
    } else {
      return res.status(401).send({
        success: false,
        message: " email is not registered",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While sending otp",
      error,
    });
  }
};

const changePasswordController = async (req, res) => {
  try {
    let { email, code, password } = req.body;

    let data = await OtpModel.findOne({ email, code });
    if (data) {
      let currentTime = new Date().getTime();
      let diff = data.expireIn - currentTime;
      if (diff < 0) {
        return res.status(401).send({
          success: false,
          message: " expired",
        });
      } else {
        let user = await userModel.findOne({ email });
        user.password = password;

        user.save();
        return res.status(201).send({
          success: true,
          message: " password changed succesfully",
        });
      }
    } else {
      return res.status(200).send({
        success: false,
        message: " invalid mail or otp",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: " error in changing password",
      error,
    });
  }
};

// login callback
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email, password });
    if (!user) {
      return res.status(404).send("User Not Found");
    }
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error,
    });
  }
};

const registerOTPController = async (req, res) => {
  try {
    const { email } = req.body;

    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "Already Registered .Please Login",
      });
    }
    let otpcode = Math.floor(Math.random() * 10000 + 1);
    let optpdata = new OtpModel({
      email,
      code: otpcode,
      expireIn: new Date().getTime() + 300 * 1000,
    });
    let otpResponse = await optpdata.save();
    mailer(email, otpcode);
    return res.status(201).send({
      success: true,
      message: "otp sent to the email please check your mail",
      optpdata,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in registration",
      error,
    });
  }
};

//Register Callback
const registerController = async (req, res) => {
  try {
    const { code, name, email, password } = req.body;
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "Already Registered .Please Login",
      });
    }
    let data = await OtpModel.findOne({ email, code });
    if (data) {
      let currentTime = new Date().getTime();
      let diff = data.expireIn - currentTime;
      if (diff < 0) {
        return res.status(401).send({
          success: false,
          message: " expired",
        });
      }
    } else {
      return res.status(200).send({
        success: false,
        message: " invalid mail or otp",
      });
    }
    const newUser = new userModel({ name, email, password });
    await newUser.save();
    res.status(201).json({
      success: true,
      newUser,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error,
    });
  }
};

module.exports = {
  loginController,
  registerController,
  registerOTPController,
  emailSendController,
  changePasswordController,
};
