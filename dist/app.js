"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const file_routes_js_1 = __importDefault(require("./routes/file.routes.js"));
const path_1 = __importDefault(require("path"));
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.setMiddleWares();
        this.setRoutes();
    }
    setMiddleWares() {
        this.app.use(express_1.default.json({ limit: '16kb' }));
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
        this.app.use(express_1.default.static('public'));
        this.app.set('view engine', 'ejs');
        console.log(path_1.default.join(__dirname, '../views'));
        this.app.set('views', path_1.default.join(__dirname, '../views'));
    }
    setRoutes() {
        this.app.use('/', file_routes_js_1.default);
    }
    getServer() {
        return this.app;
    }
}
exports.default = new App().getServer();
