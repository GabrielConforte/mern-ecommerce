//dependencias
import express  from "express";
import logger  from "./config/logger.js";
import path from "path";
const app = express();
import cors from "cors";
//puertos
const port = process.env.PORT || 5000;

//modelos y rutas
import rutasProductos from "./routes/rutasProductos.js";
import rutasUsuarios from "./routes/rutasUsuarios.js";
import rutasOrdenes from "./routes/rutasOrdenes.js";
//import seed from "./routes/seedRoutes.js";


//middlewares
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

//rutas
app.use('/api/product', rutasProductos);
app.use('/api/users', rutasUsuarios);
app.use('/api/orders', rutasOrdenes);

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, 'frontend/build')));
app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
}
);
//mensajes de error
app.use((err, req, res, next) => {
    logger.error(err.stack);
    res.status(500).send({message: err.message});
});

app.listen(port, () => logger.info(`Server iniciado desde  http://localhost:${port}`));