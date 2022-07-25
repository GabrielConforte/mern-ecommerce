//este config genera el token para el frontend
import jwt from "jsonwebtoken";
import varEnv from "../config/index.js";
const { secret } = varEnv;
const key = secret.secret_key || "secret";

//genera el token de autorizacion
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

//verifica el token de autorizacion
export const isAuth = (req, res, next) => {
    const authorization= req.headers.autorizacion;
    if (authorization) {
        const token = authorization.slice(7, authorization.length);//eliminamos el Bearer de la cadena
        jwt.verify(token, key, (err, decoded) => {
            if (err) {
                res.status(401).send({ message: "token invalido, compruebe su conexion o vuelva a loguearse" });
            } else {
                req.user = decoded;
                next();
            }
        });
    } else {
        res.status(401).send({ message: "no hay token" });
    }
    }