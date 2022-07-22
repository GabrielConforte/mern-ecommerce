import dotenv from 'dotenv';

dotenv.config();

let config = {
    port: process.env.PORT,
    cors: process.env.CORS,
    dev: process.env.NODE_ENV,
}

let mongo_db = {
    mongo_uri: process.env.MONGO_URI,
    mongo_name: process.env.DB_NAME,
}

let cors = {
    cors: process.env.CLIENT_URL,
}

const varEnv ={ config, mongo_db, cors };

export default varEnv;
