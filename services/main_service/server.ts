import app from "./app";
import dotenv from "dotenv";
import sequelize from "./shared/config/pg_database";

dotenv.config({ path: "./.env" });

const pg_connect = async () => {
  try {
    sequelize.authenticate();
    console.log("The PostgreSQL database has successfully connected");
    await sequelize.sync({ force: true });
  } catch (err) {
    console.log("Unable to connect to database", err);
  }
};

pg_connect();

const port = Number(process.env.PORT);
app.listen(port, "127.0.0.1", () => {
  console.log(`Server running at ${port}`);
});
