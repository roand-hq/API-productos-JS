import dotenv from "dotenv";
dotenv.config()

export const config = {
    db: { // aqui se conectan todas las variables que tenga en el env
        URI: process.env.db_uri
    },
    server: {
        PUERTO: process.env.port
    }
}