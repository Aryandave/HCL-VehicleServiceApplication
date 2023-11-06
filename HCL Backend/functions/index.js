require('dotenv').config();

const { express } = require("./modules/base");

const { globalErrorHandler } = require("./utils/errorHandler");

const { vehicleRouter } = require("./apis/vehicle/router");
const { bookingRouter } = require("./apis/booking/router");
const { generateRequestId } = require('./utils/requestId');
const { ownerRouter } = require('./apis/owner/router');

const router = express.Router();

global.requests = {};

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

// ROUTES
// app.use('/', );
app.use("/booking", generateRequestId, bookingRouter);
app.use("/vehicle", generateRequestId, vehicleRouter);
app.use("/owner", generateRequestId, ownerRouter);


app.use(globalErrorHandler);

app.listen(PORT, () => {
    var route, routes = [];

    app._router.stack.forEach(function (middleware) {
        if (middleware.route) { // routes registered directly on the app
            routes.push(`${middleware.route.methods} - ${middleware.route.path}`);
        } else if (middleware.name === 'router') { // router middleware 
            middleware.handle.stack.forEach(function (handler) {
                route = handler.route;
                routes && routes.push(`${JSON.stringify(route.methods)} - ${route.path}`);
            });
        }
    });
    // console.log(route);
    console.log(routes);
    console.log(`Running on port ${PORT}`)
});