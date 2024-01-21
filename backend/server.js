const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const PORT = process.env.PORT || 5000;
dotenv.config();

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("./public"));

app.use(
  cors({
    // origin: `${process.env.REACT_URL}`,
    origin: "*",
    credentials: true,
  })
);

const User = require("./models/student.js");
// const Product = require("./models/product.js");

// APIs------------------------------------------

//health api
app.get("/health", (req, res) => {
  res.json({ message: "All good!" });
});

const studentRoutes = require("./routes/studentRoutes");
// const productRoutes = require("./routes/productRoutes");

app.use("/", studentRoutes);
// app.use("/", productRoutes);

app.listen(PORT, () => {
  mongoose
    .connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log(`Server running on http://localhost:${PORT}`))
    .catch((error) => console.error(error));
});