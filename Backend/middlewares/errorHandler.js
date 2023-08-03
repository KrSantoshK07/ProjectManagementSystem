import { constants } from "../constants.js";

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;

    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            res.json({ "statusCode": constants.VALIDATION_ERROR, title: "Validation Failed", message: err.message, stackTrace: err.stack })
            break;

        case constants.NOT_FOUND:
            res.json({ "statusCode": constants.NOT_FOUND, title: "Not Found", message: err.message, stackTrace: err.stack })
            break;

        case constants.UNAUTHORIZED:
            res.json({ "statusCode": constants.UNAUTHORIZED, title: "Anauthorized", message: err.message, stackTrace: err.stack })
            break;

        case constants.FORBIDDEN:
            res.json({ "statusCode": constants.FORBIDDEN, title: "Forbidden", message: err.message, stackTrace: err.stack })
            break;

        case constants.SERVER_ERROR:
            res.json({ "statusCode": constants.SERVER_ERROR, title: "Server Error", message: err.message, stackTrace: err.stack })
            break;

        default:
            res.json({ "statusCode": 404, title: "Something went wrong", message: err.message, stackTrace: err.stack })
            break;
    }
}

export default errorHandler;