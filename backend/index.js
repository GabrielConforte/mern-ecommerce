//dependencias
import express  from "express";
import logger  from "./config/logger.js";
import  varEnv  from "./config/index.js";
const app = express();
const __dirname = path.resolve();
import path from "path";
import cors from "cors";
console.log(varEnv);
const production = varEnv.config.production || false;
const port = varEnv.config.port || 5000;
const port_socket = varEnv.config.port_socket || 5001;
import  { sockets } from "./controller/socket.js";

//modelos y rutas
import rutasProductos from "./routes/rutasProductos.js";
import rutasUsuarios from "./routes/rutasUsuarios.js";
import rutasOrdenes from "./routes/rutasOrdenes.js";
import rutasMensajes from "./routes/rutasMensajes.js";

//middlewares
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());


//rutas
app.use('/api/product', rutasProductos);
app.use('/api/users', rutasUsuarios);
app.use('/api/orders', rutasOrdenes);


if(production) {
app.use(express.static(path.join(__dirname, 'frontend/build')));
app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
}
); }


//mensajes de error
app.use((err, req, res, next) => {
    logger.error(err.stack);
    res.status(500).send({message: err.message});
});

app.listen(port, () => logger.info(`Server iniciado desde  http://localhost:${port}`));

import http from "http";
const servidor = http.createServer(app);

servidor.listen(port_socket);
sockets(servidor)
