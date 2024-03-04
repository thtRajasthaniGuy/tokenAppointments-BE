"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
var app_1 = require("./app");
Object.defineProperty(exports, "app", { enumerable: true, get: function () { return app_1.app; } });
var db_js_1 = require("./src/config/db.js");
var body_parser_1 = __importDefault(require("body-parser"));
var http_1 = __importDefault(require("http"));
var cors_1 = __importDefault(require("cors"));
var server = http_1.default.createServer(app_1.app);
require("dotenv").config();
(0, db_js_1.mongoDbConnect)();
app_1.app.use(body_parser_1.default.json());
app_1.app.use((0, cors_1.default)({
    origin: "*",
}));
app_1.app.use((0, cors_1.default)({
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
}));
app_1.app.use(function (req, res, next) {
    //to allow cross domain requests to send cookie information.
    res.header("Access-Control-Allow-Credentials", "true");
    // origin can not be '*' when crendentials are enabled. so need to set it to the request origin
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    // list of methods that are supported by the server
    res.header("Access-Control-Allow-Methods", "OPTIONS,GET,PUT,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, X-XSRF-TOKEN");
    next();
});
server.listen(process.env.PORT, function () {
    console.log("API server is running at ".concat(process.env.PORT));
});
//# sourceMappingURL=index.js.map