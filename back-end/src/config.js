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
    },
    EMAIL: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASS
    },
    cloudinary:{ 
        cloud_name: process.env.CLOUD_NAME,
        cloud_api_key:process.env.CLOUD_API_KEY,
        cloud_api_secret:process.env.CLOUD_API_SECRET
    }
}