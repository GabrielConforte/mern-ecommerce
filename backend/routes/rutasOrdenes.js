import express from "express";
import daos from "../models/daos/index.js"
const { ordenesDao } = daos;
const rutasOrdenes = express.Router();
import expressAsyncHandler from "express-async-handler";
import {isAuth}  from "../config/generateToken.js";

rutasOrdenes.get("/", async (req, res) => {
    let ordenes = await ordenesDao.getAll();
    res.send(ordenes);
}   
);

rutasOrdenes.post("/", isAuth ,expressAsyncHandler(async (req, res) => {
    const orden = await ordenesDao.save(req.body);
    if (orden) {
        res.send(orden);
    } else {
        res.status(404).send({ message: 'no se pudo guardar la orden' });
    }
}
));

rutasOrdenes.get("/user/:userId", async (req, res) => {
    const orden = await ordenesDao.getByUserId(req.params.userId);
    if (orden) {
        res.send(orden);
    } else {
        res.status(404).send({ message: 'no se pudo encontrar la orden' });
    }
}
);

rutasOrdenes.get("/:id", async (req, res) => {
    const orden = await ordenesDao.getById(req.params.id);
    if (orden) {
        res.send(orden);
    } else {
        res.status(404).send({ message: 'no se pudo encontrar la orden' });
    }
}
);


export default rutasOrdenes;