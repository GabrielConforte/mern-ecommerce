import express  from "express";
import data from "./data.js";
import logger  from "./config/logger.js";

const app = express();
app.get("/api/product", (req, res) => {
    logger.info("Request received");
    res.send(data.products);
});

app.get("/api/product/slug/:slug", (req, res) => {
    logger.info("Request received");
    const product = data.products.find(product => product.slug === req.params.slug);
    if(product){
    res.send(product);
    logger.info("Producto encontrado -> " + product.name);
}
    else{
        res.status(404).send({message: "Producto " + req.params.slug + " no encontrado"});
    }
});

app.get("/api/product/:id", (req, res) => {
    const product = data.products.find(product => product._id === req.params.id);
    if (product) {
        res.send(product);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
  });

const port = process.env.PORT || 5000;

app.listen(port, () => logger.info(`Server iniciado desde  http://localhost:${port}`));