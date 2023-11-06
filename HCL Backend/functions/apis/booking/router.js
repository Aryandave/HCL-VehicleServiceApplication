const { express } = require("../../modules/base");

const router = express.Router();

const { createNewBookingRequest } = require('./newBookingRequest');
const { getAllBookingRequestsForMechanic, getAllBookingRequestsForOwner } = require("./getAllBookingRequests");
const { actOnBookingRequest } = require("./actOnBookingRequest");

router.get('/ownerBookings', getAllBookingRequestsForOwner);
router.get('/mechanicBookings', getAllBookingRequestsForMechanic);
router.post('/newBooking', createNewBookingRequest);
router.post('/accept', actOnBookingRequest);
router.post('/reject', actOnBookingRequest);

// router.use(compressSendResponse);

exports.bookingRouter = router;