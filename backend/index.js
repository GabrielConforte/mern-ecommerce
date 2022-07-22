import express  from "express";
import logger  from "./config/logger.js";
import rutasProductos from "./routes/rutasProductos.js";

const app = express();


app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/product', rutasProductos);

const port = process.env.PORT || 5000;

app.listen(port, () => logger.info(`Server iniciado desde  http://localhost:${port}`));