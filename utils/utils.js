exports.catchAsync = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch(next);
    }
}

exports.successMessage = (res, message = "", statusCode, ...data)  => {
    res.status(statusCode).json({
        status:"success",
        message,
        data: data[0]
    })
}