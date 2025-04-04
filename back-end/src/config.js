import dotenv from "dotenv";
dotenv.config()

export const config = {
    db: { // aqui se conectan todas las variables que tenga en el env
        URI: process.env.DB_URI
    },
    server: {
        PUERTO: process.env.PORT
    },
    JWT: {
        secret: process.env.JWT_SECRET,
        expires: process.env.JWT_EXPIRES
    },
    admin: {
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD
    }
}