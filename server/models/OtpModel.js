const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      require: true,
    },
    code: {
      type: String,
    },
    expireIn: Number,
  },
  { timestamps: true }
);
const OtpModel = mongoose.model("otp", otpSchema);
module.exports = OtpModel;
// export default mongoose.model("otp", otpSchema);
