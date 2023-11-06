const CustomError = require("../../utils/customError");
const db = require("../../utils/db");
const { generateResponse } = require("../../utils/responseGenerator");
const { getAllBookingRequestsForMechanicQuery, getAllBookingRequestsForOwnerQuery } = require("./bookingQueries");

exports.getAllBookingRequestsForOwner = async (req, res, next) => {
    try {
        let statusCode = 200;
        const header = req.headers;

        const ownerId = header.owner_id ?? null;

        if (!!!ownerId) {
            next(new CustomError("OWNER ID IS REQUIRED", 400));
            return;
        }

        const ownerExists = await db.query("SELECT id FROM owner WHERE id = $1", [ownerId]);

        if (ownerExists.rowCount === 0) {
            next(new CustomError("OWNER ID DOES NOT EXSIST", 400));
            return;
        }

        const { rows } = await db.query(getAllBookingRequestsForOwnerQuery(), [ownerId]);

        let resultData = {};

        rows.forEach((row) => {
            if(!resultData.hasOwnProperty(row.garageId)) {
                resultData[row.garageId] = [row];
            } else {
                resultData[row.garageId].push(row);
            }
        });

        const response = generateResponse("Retrieved data successfully", statusCode, req, {resultData});

        res.status(statusCode).send(response);

    } catch (err) {
        next(new CustomError(err));
        return;
    }
};

exports.getAllBookingRequestsForMechanic = async (req, res, next) => {
    try {
        let statusCode = 200;
        const header = req.headers;

        const mechanicId = header.mechanic_id ?? null;

        if (!!!mechanicId) {
            next(new CustomError("MECHANIC ID IS REQUIRED", 400));
            return;
        }

        const mechanicExist = await db.query("SELECT id FROM mechanic WHERE id = $1", [mechanicId]);

        if (mechanicExist.rowCount === 0) {
            next(new CustomError("MECHANIC ID DOES NOT EXSIST", 400));
            return;
        }

        const { rows } = await db.query(getAllBookingRequestsForMechanicQuery(), [mechanicId]);

        let resultData = {};

        rows.forEach((row) => {
            if(!resultData.hasOwnProperty(row.garageId)) {
                resultData[row.garageId] = [row];
            } else {
                resultData[row.garageId].push(row);
            }
        })

        const response = generateResponse("Retrieved data successfully", statusCode, req, {resultData});

        res.status(statusCode).send(response);

    } catch (err) {
        next(new CustomError(err));
        return;
    }
};