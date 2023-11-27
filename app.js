const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const morgan = require("morgan");

const AppError = require("./utils/appError");
const errorHandler = require("./utils/errorHandler");
const movieRoutes = require("./routes/movieRoutes");

const app = express();
app.use(express.json());

dotenv.config();

if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

app.use(process.env.API_URL + "/movies", movieRoutes);
app.all("*", (req, res, next) => {
    next(new AppError(`${req.originalUrl} not found`, 404));
});
app.use(errorHandler);

mongoose
    .connect(process.env.DATABASE)
    .then((con) => console.log("Database connection was successful"))
    .catch(() => console.log("Database connection was unsuccessful"))

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server running on port ${port}`));
