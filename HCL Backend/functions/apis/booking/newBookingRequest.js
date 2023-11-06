const CustomError = require("../../utils/customError");
const db = require("../../utils/db");
const { generateResponse } = require("../../utils/responseGenerator");
const { createBookingRequestQuery } = require("./bookingQueries");

exports.createNewBookingRequest = async (req, res, next) => {
    try {
        let statusCode = 200;
        const header = req.headers;
        const body = req.body;

        const ownerId = header.owner_id ?? null;
        const vehicleId = header.vehicle_id ?? null;
        const garageId = header.garage_id ?? null;

        if (!ownerId) {
            next(new CustomError("Owner ID required", 400));
            return;
        }
        if (!vehicleId) {
            next(new CustomError("Vehicle ID required", 400));
            return;
        }
        if (!garageId) {
            next(new CustomError("Garage ID required", 400));
            return;
        }

        const userExist = await db.query("SELECT id FROM owner WHERE id = $1", [ownerId]);
        const vehicleExist = await db.query("SELECT id, owner FROM vehicles WHERE id = $1", [vehicleId]);
        const garageExist = await db.query("SELECT id FROM garage WHERE id = $1", [garageId]);

        if (userExist.rowCount === 0 || vehicleExist.rowCount === 0 || garageExist.rowCount === 0) {
            next(new CustomError("OWNER/VEHILE/GARAGE ID DOES NOT EXSIST", 400));
        }
        if (userExist.rows[0].owner !== ownerId) {
            next(new CustomError("Bad Request - Invalid Data", 403));
        }

        let { requestType, requestDate } = body;
        requestDate = new Date(requestDate) ?? new Date().setDate(new Date().getDate() + 2);
        requestType = requestType?.toUpperCase() ?? "SERVICE";

        const insertRequest = await db.query(
            createBookingRequestQuery(),
            [ownerId, vehicleId, garageId, requestDate, requestType]
        );
        
        const response = generateResponse("Requested Booked Successfully", statusCode, req, {insertRequest});

        res.status(200).send(response);
    } catch (err) {
        next(new CustomError(err));
        return;
    }
};