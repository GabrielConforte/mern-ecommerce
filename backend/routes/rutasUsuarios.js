//dependencias
import express  from "express";
import bcrypt from "bcryptjs";
import { generateToken } from "../config/generateToken.js";
import expressAsyncHandler from 'express-async-handler';

//importar modelos
const userRouter = express.Router();
import daos from "../models/daos/index.js";
const { userDao } = daos;

userRouter.post("/signin", expressAsyncHandler(async (req, res) => {
        const user = await userDao.getUserByEmail(req.body.email);
            if (user) {
                if (bcrypt.compareSync(req.body.password, user.password)) {
    //hace las comparaciones de datos, si es correcto genera el token y lo devuelve junto con el usuario
                    res.send(
                        {
                            _id: user._id,
                            name: user.nombre,
                            email: user.email,
                            isAdmin: user.isAdmin,
                            token: generateToken(user)
                         }
                    );
                } else {
                    res.status(401).send({ message: "Contraseña incorrecta" });
                }
            } else {
                res.status(401).send({ message: "Usuario no encontrado" });
            }
    }
    ));

export default userRouter;