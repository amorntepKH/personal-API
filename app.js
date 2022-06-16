require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

// const { sequelize } = require("./models/index");
// sequelize.sync({ alter: true });

const app = express();
app.use(cors());

const authRouter = require("./routes/authRoute");
const userRouter = require("./routes/userRoute");
const authenticate = require("./middlewares/authenticate");
const orderRouter = require("./routes/orderRoute");
const productRouter = require("./routes/productRoute");

const notFoundMiddleware = require("./middlewares/notFound");
const errorMiddleware = require("./middlewares/error");

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/auth", authRouter);
app.use("/users", authenticate, userRouter);
app.use("/orders", orderRouter);
app.use("/products", productRouter);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log("server running on port: " + port));
