const CustomError = require("../../utils/customError");
const db = require("../../utils/db");
const { generateResponse } = require("../../utils/responseGenerator");
const { rejectBookingRequestQuery, acceptBookingRequestQuery } = require("./bookingQueries");

const validateQuery = () => `
    SELECT
        br.id,
        m.id
    FROM
        booking_requests as br
    JOIN garage AS g ON
        g.id = br.garage
    JOIN mechanic AS m ON
        m.id = g.mechanic
    WHERE
        m.id = $1 AND br.id = $2;
`


exports.actOnBookingRequest = async (req, res, next) => {
    try {

        let statusCode = 200;
        const header = req.headers;
        const body = req.body;
        const url = req.url;

        mechanicId = header.mechanic_id ?? null;

        if (!!!mechanicId) {
            next(new CustomError("MECHANIC ID IS REQUIRED", 401));
            return;
        }

        const mechanicExist = await db.query("SELECT id FROM mechanic WHERE id = $1", [mechanicId]);

        if (mechanicExist.rowCount === 0) {
            next(new CustomError("MECHANIC ID DOES NOT EXSIST", 403));
            return;
        }

        bookingRequestId = body.bookingRequestId ?? null;

        if (!bookingRequestId) {
            next(new CustomError("BOOKING ID MISSNIG", 403));
            return
        }

        const { rowCount } = await db.query(validateQuery(), [mechanicId, bookingRequestId]);

        if (rowCount === 0) {
            next(new CustomError("INVALID REQUEST", 403));
        }

        let response;
        if (url === '/accept') {
            await db.query(acceptBookingRequestQuery(), [bookingRequestId]);
            response = generateResponse("Accepted Booking Successfully", statusCode, req);
        } else if (url === '/reject') {
            await db.query(rejectBookingRequestQuery(), [bookingRequestId]);
            response = generateResponse("Rejected Booking Successfully", statusCode, req);
        }

        res.status(statusCode).send(response);
    } catch (err) {
        console.error(err);
        next(new CustomError(err));
        return;
    }
}