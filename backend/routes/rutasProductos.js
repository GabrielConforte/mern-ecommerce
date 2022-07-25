import express from "express";
import daos from "../models/daos/index.js"
const { productosDao } = daos;
const rutasProductos = express.Router();
import logger from "../config/logger.js";

rutasProductos.get("/", async (req, res) => {
    let productos = await productosDao.getAll();
    res.send(productos);
}
);

rutasProductos.get("/slug/:slug", async (req, res) => {
    const product = await productosDao.getBySlug(req.params.slug);
    if(product){
    res.send(product);
}
    else{
        res.status(404).send({message: "Producto " + req.params.slug + " no encontrado"});
    }
});

rutasProductos.get("/:id", async (req, res) => {
    const product = await productosDao.getById(req.params.id);
    if (product) {
        res.send(product);
    } else {
        res.status(404).send({ message: 'producto no encontrado' });
    }
  });

rutasProductos.post("/", async (req, res) => {
        const product = await productosDao.save(req.body);
        if (product) {
            res.send(product);
        } else {
            res.status(404).send({ message: 'no se pudo guardar el producto' });
        }
    }
    );

rutasProductos.put("/:id", async (req, res) => {
        const product = await productosDao.editById(req.params.id, req.body);
        if (product) {
            res.send(product);
        } else {
            res.status(404).send({ message: 'no se pudo editar el producto' });
        }
    }
    );

rutasProductos.delete("/:id", async (req, res) => {
        const product = await productosDao.delete(req.params.id);
        if (product) {
            res.send(product);
        } else {
            res.status(404).send({ message: 'no se pudo eliminar el producto' });
        }
    }
    );

export default rutasProductos;