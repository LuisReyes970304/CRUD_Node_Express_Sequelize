import { Sequelize } from "sequelize";
import "dotenv/config";

export const port: Number = parseInt(process.env.PORT as string, 10);
export const host: String = process.env.URL as string;

// const sequelize = new Sequelize()