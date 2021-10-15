"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
require("process");
var morgan_1 = __importDefault(require("morgan"));
var http = __importStar(require("http"));
var multer_1 = __importDefault(require("multer"));
var app = (0, express_1.default)();
var PORT = process.env.PORT || 8181;
var routes = express_1.default.Router();
routes.get("/", function (req, res) {
    console.table("request: " + req);
    res.send("Hey, buddy!");
});
var storage = multer_1.default.diskStorage({
    destination: ".",
    filename: function (req, file, cb) {
        var filename = file.originalname;
        cb(null, filename);
    },
});
var upload = (0, multer_1.default)({ storage: storage });
routes.post("/", upload.any(), function (req, res) {
    res.send(req.files);
});
app.use((0, morgan_1.default)("combined"));
app.use(express_1.default.json());
app.use(express_1.default.static("."));
app.use("/users", routes);
var server = http.createServer(app);
server.listen(PORT, function () {
    console.log("HTTP server listening on " + PORT);
});
//# sourceMappingURL=server.js.map