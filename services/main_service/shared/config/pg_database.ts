import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();
const url = String(process.env.PG_DATABASE_URL);

const sequelize = new Sequelize(url, {
  dialect: "postgres",
  logging: console.log,
});

export default sequelize;

//postgres://postgres:password@localhost:5432/omnibussines
//postgresql://postgres:BFZhYcHRCbWenOvSScuDPsGUwtybjeVP@maglev.proxy.rlwy.net:37935/railway
//postgresql://postgres:BFZhYcHRCbWenOvSScuDPsGUwtybjeVP@postgres.railway.internal:5432/railway
//postgres://username:randompassword@containers-us-west-141.railway.app:5432/railway
