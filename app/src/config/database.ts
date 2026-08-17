import { Sequelize } from "sequelize";
import "dotenv/config";
// import { database } from "../models/user.model.ts";

export const port: Number = parseInt(process.env.SERVER_PORT as string, 10);
export const host: String = process.env.SERVER_URL as string; 

const sequelize = new Sequelize(
    process.env.POSTGRES_DATABASE as string,
    process.env.POSTGRES_USER as string,
    process.env.POSTGRES_PASSWORD as string,
    {
        host: process.env.POSTGRES_HOST as string,
        port: parseInt(process.env.POSTGRES_PORT as string, 10),
        dialect: "postgres",
        logging: false,
    } 
);

export async function connectDB(): Promise<void> {
    try {
        await sequelize.authenticate();
        console.log("✅ Conexión a PostgreSQL establecida correctamente.");
    } catch (error) {
        console.error("❌ No se pudo conectar a la base de datos:", error);
    }
}

export default sequelize