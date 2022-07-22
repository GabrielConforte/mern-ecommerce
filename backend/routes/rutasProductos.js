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
    logger.info("Request received");
    const product = await productosDao.getBySlug(req.params.slug);
    if(product){
    res.send(product);
    logger.info("Producto encontrado -> " + product.name);
}
    else{
        res.status(404).send({message: "Producto " + req.params.slug + " no encontrado"});
    }
});

rutasProductos.get("/:id", async (req, res) => {
    const product = await productosDao.getById(req.params.id);
    logger.info(product);
    if (product) {
        res.send(product);
    } else {
        res.status(404).send({ message: 'producto no encontrado' });
    }
  });

export default rutasProductos;