const AppError = require("./appError");

const handleCastError = (err) => {
    const message = `Invalid ${err.path}: ${err.value}`;
    return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
    const message = `Duplicate value: ${err.keyValue.name}. Please use another value`;
    return new AppError(message, 400);
};

const handleValidationError = (err) => {
    const errors = Object.values(err.errors).map((el) => el.message);
    const message = `Invalid Input data. ${errors.join(". ")}`;
    return new AppError(message, 400);
};


module.exports = (err, req, res, next) => {
    let error = Object.assign(err);

    if (error.name === "CastError") error = handleCastError(error);
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error.name === "ValidationError") error = handleValidationError(error);

    const statusCode = error.statusCode || 500;

    res.status(statusCode).json({
        status: error.status,
        message: error.message,
        isOperational: error.isOperational
    });
}