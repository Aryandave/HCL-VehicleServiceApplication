const { getContext } = require("../../index");
const CustomError = require("../../utils/customError");
const db = require("../../utils/db");
const { generateResponse } = require("../../utils/responseGenerator");

const _getMyVehiclesQuery = () => `
SELECT
  id as "vehicleId",
  owner as "ownerId",
  registration as "vehicleRegistration",
  manufacturer as "vehicleManufacturer",
  model as "vehicleModel",
  year as "vehicleYear",
  no_of_wheels as "numberOfWheels"

FROM 
  vehicles
WHERE
  owner = $1;
`

exports.getMyVehicles = async (req, res, next) => {
    let statusCode = 200;
    const header = req.headers;

    const ownerId = header.owner_id ?? null;

    if (!ownerId) {
        next(new CustomError("Owner ID required", 400));
        return;
    }

    const { rows, err } = await db.query(_getMyVehiclesQuery(), [ownerId]);

    if(err) {
        next(new CustomError(err, 404));
        return;
    }

    console.log(rows);

    const response = generateResponse("Fetched Vehicle Data successfully", statusCode, req, { data: rows });

    res.status(statusCode).send(response);
}