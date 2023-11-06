const crypto = require('crypto');

exports.generateRequestId = (req, res, next) => {
    console.log("GENERATING REQUESTID");
    const newRequestId = crypto.randomUUID();
    req.requestId = newRequestId;
    global.requests[newRequestId] = {
        req, res, next
    };

    next();
}