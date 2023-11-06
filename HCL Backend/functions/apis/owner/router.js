const { express } = require("../../modules/base");

const router = express.Router();

const { getMyDetails } = require("./getMyDetails");

router.get('/myDetails', getMyDetails);

// router.use(compressSendResponse);

exports.ownerRouter = router;