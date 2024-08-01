"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
function errorHandler(err, req, res, next) {
    if (err instanceof Error) {
        res.status(500).send(err.message);
    }
    else {
        res.status(500).send("An unknown error occurred");
    }
}
