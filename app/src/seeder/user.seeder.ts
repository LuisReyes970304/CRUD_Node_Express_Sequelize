import { faker } from "@faker-js/faker";
import sequelize from "../config/database.ts";
import User from "../models/user.model.ts";
import type { UserCreationDto } from "../dto/user.dto.ts";

const RANDOM_USERS_COUNT = 6;

/**
 * Usuarios fijos, siempre presentes (útiles para probar login,
 * roles, admin panel, etc. con credenciales conocidas).
 */
const fixedUsers: UserCreationDto[] = [
    { name: "admin", password: "Admin123!" },
    { name: "luis.reyes", password: "LuisDev2026!" },
    { name: "qa.tester", password: "QaTest2026!" },
    { name: "demo.user", password: "DemoUser2026!" },
];

/**
 * Genera usuarios aleatorios con faker, útiles para poblar la tabla
 * con datos más realistas (paginación, búsquedas, listados, etc.).
 */
const generateRandomUsers = (count: number): UserCreationDto[] => {
return Array.from({ length: count }, () => ({
    name: faker.internet.username().toLowerCase(),
    password: faker.internet.password({ length: 12 }),
}));
}

export const seedUsers: UserCreationDto[] = [
    ...fixedUsers,
    ...generateRandomUsers(RANDOM_USERS_COUNT),
];

/**
 * Ejecuta el seeder de usuarios.
 * Es idempotente: si el usuario ya existe (por "name") no lo vuelve
 * a crear, así se puede ejecutar cada vez que levanta el contenedor
 * sin generar duplicados ni errores.
 */
export async function runSeeder(): Promise<void> {
    await sequelize.authenticate();
    await sequelize.sync();

    for (const seed of seedUsers) {
        const [user, created] = await User.findOrCreate({
            where: { name: seed.name },
            defaults: {
                name: seed.name,
                password: seed.password,
            },
        });

        console.log(
        created
            ? `[seeder] usuario creado: ${user.name}`
            : `[seeder] usuario ya existente, se omite: ${user.name}`,
        );
    }
}

const isMainModule = import.meta.url === `file://${process.argv[1]}`;

if (isMainModule) {
    runSeeder()
        .then(async () => {
            console.log("[seeder] ejecución finalizada correctamente");
            await sequelize.close();
            process.exit(0);
        })
        .catch(async (error) => {
            console.error("[seeder] error ejecutando el seeder:", error);
            await sequelize.close();
            process.exit(1);
        });
}