import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();
const url = String(process.env.PG_DATABASE_URL);

const sequelize = new Sequelize(url, {
  dialect: "postgres",
  logging: console.log,
});

export default sequelize;

///postgresql://postgres:BFZhYcHRCbWenOvSScuDPsGUwtybjeVP@maglev.proxy.rlwy.net:37935/railway

// psql -h maglev.proxy.rlwy.net -U postgres -p 37935 -d railway
