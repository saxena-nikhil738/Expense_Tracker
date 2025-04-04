const express = require("express");
const {
  loginController,
  registerController,
  registerOTPController,
  emailSendController,
  changePasswordController,
} = require("../controllers/userController");

//router object
const router = express.Router();

//routers
// POST || LOGIN USER
router.post("/login", loginController);

router.post("/email-send", emailSendController);

router.post("/change-password", changePasswordController);

//POST || REGISTER USER
router.post("/register", registerController);

router.post("/register-otp", registerOTPController);

module.exports = router;
