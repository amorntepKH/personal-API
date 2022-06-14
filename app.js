require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

// const { sequelize } = require("./models/index");
// sequelize.sync({ alter: true });

const app = express();
app.use(cors());

const authRoute = require("./routes/authRoute");
const authenticate = require("./middlewares/authenticate");
const orderRoute = require("./routes/orderRoute");
const productRoute = require("./routes/productRoute");

const notFoundMiddleware = require("./middlewares/notFound");
const errorMiddleware = require("./middlewares/error");

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/auth", authRoute);
app.use("/orders", orderRoute);
app.use("/products", productRoute);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log("server running on port: " + port));
