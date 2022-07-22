//este config genera el token para el frontend
import jwt from "jsonwebtoken";
import varEnv from "../config/index.js";
const { secret } = varEnv;
const key = secret.secret_key || "secret";

export const generateToken = (user) => {
    return jwt.sign(
            {   
                _id: user._id,
                name: user.nombre,
                email: user.email,
                isAdmin: user.isAdmin
            }
        , key, {
        expiresIn: "1h",
        });
}