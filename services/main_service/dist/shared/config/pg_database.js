"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const url = String(process.env.PG_DATABASE_URL);
const sequelize = new sequelize_1.Sequelize(url, {
    dialect: "postgres",
    logging: console.log,
});
exports.default = sequelize;
//postgres://postgres:password@localhost:5432/omnibussines
//postgresql://postgres:BFZhYcHRCbWenOvSScuDPsGUwtybjeVP@maglev.proxy.rlwy.net:37935/railway
//postgresql://postgres:BFZhYcHRCbWenOvSScuDPsGUwtybjeVP@postgres.railway.internal:5432/railway
//postgres://username:randompassword@containers-us-west-141.railway.app:5432/railway
