const express = require("express");
const connectDB = require("./src/config/db");
const app = express();
const path = require("path");
const morgan = require('morgan');

var cors = require("cors");
const upload = require("express-fileupload");
const PORT = process.env.PORT || 5001;

const adminRouter = require("./src/routes/admin/adminRouter");
const userRouter = require("./src/routes/user/userRouter");
// const indexRouter = require("./src/routes/indexRouter");
require("dotenv").config();

app.use(morgan("dev"));
//Connect Database
connectDB();

//Using Static
// app.use( express.static(path.join(__dirname, "public"))); //to access the files in public folder
app.use(express.static("public"))

//File Upload Middleware
app.use(upload({useTempFiles:true}));

//Init Middleware
app.use(express.urlencoded({ limit: "10mb", extended: false }));
app.use(express.json({ limit: "10mb", extended: true }));


app.use(cors());

app.use("/api/v2", adminRouter);
app.use("/api/v1", userRouter);
// app.use("/api", indexRouter);

app.get("/", (req, res) => {
  res.send("Test API");
});

app.use((req, res) => {
  res.status(404).send();
});

app.listen(PORT, () => console.log(`Server Started on Port ${PORT}`));
