const { express } = require("../../modules/base");
const { getMyVehicles } = require("./getMyVehicles");

const router = express.Router();

router.get('/myVehicles', getMyVehicles);

// router.use(compressSendResponse);

exports.vehicleRouter = router;