import dotenv from 'dotenv';

dotenv.config();

let config = {
    port: process.env.PORT,
    cors: process.env.CORS,
    dev: process.env.NODE_ENV,
    production: process.env.NODE_ENV === true,
}

let mongo_db = {
    mongo_uri: process.env.MONGO_URI,
    mongo_name: process.env.DB_NAME,
}

let cors = {
    cors: process.env.CLIENT_URL,
}

let secret = {
    secret_key: process.env.JWT_SECRET_KEY,
}

const varEnv ={ config, mongo_db, cors, secret };

export default varEnv;
