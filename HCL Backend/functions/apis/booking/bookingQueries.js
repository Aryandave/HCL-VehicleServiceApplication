exports.createBookingRequestQuery = () => `
    INSERT INTO
    booking_requests (owner, vehicle, garage, request_date, type)
    VALUES
    ($1, $2, $3, $4, $5);
`;

exports.getAllBookingRequestsForMechanicQuery = () => `
    SELECT 
        br.id as "requestId",
        br.type as "type",
        br.status as "requestStatus",
        br.request_date as "requestedDate",
        br.created_at as "createdAt",
        o.name as "ownerName",
        v.model as "vehicleModel",
        v.manufacturer as "vehicleManufacturer",
        m.name as "mechanicName",
        g.name as "garageName",
        m.id as "mechanicId",
        g.id as "garageId",
        o.id as "ownerId"
    FROM
        booking_requests as br
    LEFT JOIN owner as o on
        o.id = br.owner
    LEFT JOIN vehicles as v on
        v.id = br.vehicle
    LEFT JOIN garage as g on
        g.id = br.garage
    LEFT JOIN mechanic as m on
        m.id = g.mechanic
    WHERE
        m.id = $1;
`

exports.getAllBookingRequestsForOwnerQuery = () => `
    SELECT 
        br.id as "requestId",
        br.type as "type",
        br.status as "requestStatus",
        br.request_date as "requestedDate",
        br.created_at as "createdAt",
        o.name as "ownerName",
        v.model as "vehicleModel",
        v.manufacturer as "vehicleManufacturer",
        m.name as "mechanicName",
        g.name as "garageName",
        m.id as "mechanicId",
        g.id as "garageId",
        o.id as "ownerId"
    FROM
        booking_requests as br
    LEFT JOIN owner as o on
        o.id = br.owner
    LEFT JOIN vehicles as v on
        v.id = br.vehicle
    LEFT JOIN garage as g on
        g.id = br.garage
    LEFT JOIN mechanic as m on
        m.id = g.mechanic
    WHERE
        o.id = $1;
`

exports.acceptBookingRequestQuery = () => `
    UPDATE 
        booking_requests
    SET
        status = 'ACCEPTED'
    WHERE
        id = $1;
`

exports.rejectBookingRequestQuery = () => `
    UPDATE 
        booking_requests
    SET
        status = 'REJECTED'
    WHERE
        id = $1;
`