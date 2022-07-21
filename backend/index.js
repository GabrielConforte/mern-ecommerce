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
    logger.info("Product found -> " + product.name);
}
    else{
        res.status(404).send({message: "Product not found"});
    }
});

const port = process.env.PORT || 5000;

app.listen(port, () => logger.info(`Server iniciado desde  http://localhost:${port}`));