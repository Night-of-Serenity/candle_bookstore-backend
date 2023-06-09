require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const notFoundMiddleware = require("./middlewares/notFoundMiddleware");
const errorMiddleware = require("./middlewares/errorMiddleware");
const authRoute = require("./routes/auth-route");
const booksRoute = require("./routes/books-route");
const cartRoute = require("./routes/cart-route");
const orderRoute = require("./routes/order-route");

const app = express();

app.use(cors());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(
  rateLimit({
    windowMs: 1000 * 60 * 15, // time limit duration get request for 15 minutes
    max: 1000, // number of request
    message: { message: "too many requests" },
  })
);

app.use(helmet());
app.use(express.json());

app.use("/auth", authRoute);
app.use("/book", booksRoute);
app.use("/cart", cartRoute);
app.use("/order", orderRoute);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log("Server runing on port", port));
