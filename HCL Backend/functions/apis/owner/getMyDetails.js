const { getContext } = require("../../index");
const CustomError = require("../../utils/customError");
const db = require("../../utils/db");
const { generateResponse } = require("../../utils/responseGenerator");

const _getMyDetailsQuery = () => `
    SELECT
        o.id as "ownerId",
        o.name as "ownerName",
        o.mobile,
        o.email as "ownerEmail",
        o.area,
        o.city,
        AGE(NOW(), o.created_at) as age,
        count(v) as ownedVehicles
    FROM
        owner AS o
    RIGHT JOIN vehicles AS v ON
        v.owner = o.id
    WHERE
        o.id = $1
    GROUP BY
        o.id;
`

exports.getMyDetails = async (req, res, next) => {
    let statusCode = 200;
    const header = req.headers;

    const ownerId = header.owner_id ?? null;

    if (!ownerId) {
        next(new CustomError("Owner ID required", 400));
        return;
    }

    const { rows, err } = await db.query(_getMyDetailsQuery(), [ownerId]);

    if(err) {
        next(new CustomError(err, 404));
        return;
    }

    console.log(rows);

    const response = generateResponse("Fetched Owner Data successfully", statusCode, req, { data: rows });

    res.status(statusCode).send(response);
}