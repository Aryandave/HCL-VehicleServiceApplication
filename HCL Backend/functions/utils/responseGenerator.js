exports.generateResponse = (message, statusCode, req, data = null) => {
    console.log(`[INFO] - Request ID: ${req.requestId} - ${req.originalUrl} - ${new Date()}`);

    const response = {
        statusCode,
        data : {
            message,
            statusCode,
            timestamp: new Date()
        }
    };

    if(data) Object.assign(response.data, data);

    return response;
}