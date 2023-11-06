errorHandler = function (err, res) {
    console.log("Inside Other error handler");
    const result = {
        statusCode: err.statusCode ? err.statusCode : 500,
        message: err.message
    };

    res.status(result.statusCode).send(result);
}



exports.globalErrorHandler = function (err, req, res, next) {
    console.log("Inside Custom Error Handler");
    console.error(err);
    errorHandler(err, res);
}