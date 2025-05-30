const cors = require("cors");
const morgan = require("morgan");
const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const connectDb = require("./config/connectDb");
const path = require("path");
// config dot env file
dotenv.config();

//databse call
connectDb();

//rest object
const app = express();

//middlewares

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

app.get("/", (req, res)=>{
  console.log("welcome to backend");
  res.send("Welcome")
});

//routes
app.use("/api/v1/users", require("./routes/userRoute"));

//transections routes
app.use("/api/v1/transactions", require("./routes/transactionRoutes"));

const PORT = 8000 || process.env.PORT;

//listen server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
