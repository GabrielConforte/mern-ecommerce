import express  from "express";
import data from "./data.js";
import logger  from "./config/logger.js";

const app = express();

app.get("/api/product", (req, res) => {
    logger.info("Request received");
    res.send(data.products);
});

const port = process.env.PORT || 5000;

app.listen(port, () => logger.info(`Server iniciado desde  http://localhost:${port}`));