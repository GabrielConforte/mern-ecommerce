//dependencias
import express  from "express";
import bcrypt from "bcryptjs";
import { generateToken, isAuth } from "../config/generateToken.js";
import expressAsyncHandler from 'express-async-handler';

//importar modelos
const userRouter = express.Router();
import daos from "../models/daos/index.js";
const { userDao } = daos;

userRouter.post("/signin", expressAsyncHandler(async (req, res) => { console.log(req.body);
        const user = await userDao.getUserByEmail(req.body.email);
        console.log (user);
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

userRouter.post(
    "/signup",
    expressAsyncHandler(async (req, res) => {
        const nuevoUser = req.body;
        nuevoUser.password = bcrypt.hashSync(nuevoUser.password);
        const user = await userDao.save(nuevoUser);
        res.send({ 
            _id: user._id,
            nombre: user.nombre,
            email: user.email,
            isAdmin: false,
            token: generateToken(user),
            message: "Usuario creado correctamente"
            }
            );
        }
    ));

    userRouter.get("/", expressAsyncHandler(async (req, res) => {
        const users = await userDao.getAll();
        res.send(users);
    }
    ));

    userRouter.get("/:id", expressAsyncHandler(async (req, res) => {
        const user = await userDao.getById(req.params.id);
        if (user) {
            res.send(user);
        } else {
            res.status(404).send({ message: 'no se pudo encontrar el usuario' });
        }
    }
    ));

    userRouter.put('/', isAuth, expressAsyncHandler(async (req, res) => {
        const user = await userDao.getById(req.user._id);
        if (user) {
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;
            if(req.body.password) {
                user.password = bcrypt.hashSync(req.body.password);
            }
            const updatedUser = await userDao.save(user);
            res.send({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                isAdmin: updatedUser.isAdmin,
                token: generateToken(updatedUser)
            });
        } else {
            res.status(404).send({ message: 'no se pudo actualizar el usuario' });
        }
    }
    ));


export default userRouter;