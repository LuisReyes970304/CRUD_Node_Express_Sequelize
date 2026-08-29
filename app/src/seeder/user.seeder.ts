import sequelize from "../config/database.ts";
import User from "../models/user.model.ts";
import type { UserCreationDto } from "../dto/user.dto.ts";


/**
 * Usuarios fijos, siempre presentes (útiles para probar login,
 * roles, admin panel, etc. con credenciales conocidas).
 */
const fixedUsers: UserCreationDto[] = [
    { name: "Admin", password: "Admin123!" },
    { name: "Luis Reyes", password: "LuisDev2026!" },
    { name: "QA tester", password: "QaTest2026!" },
    { name: "Demo User", password: "DemoUser2026!" },
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

    for (const seed of fixedUsers) {
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