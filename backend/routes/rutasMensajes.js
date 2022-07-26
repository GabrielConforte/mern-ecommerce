import express from "express";
import daos from "../models/daos/index.js"
const { mensajesDao } = daos;
const rutasMensajes = express.Router();
import expressAsyncHandler from "express-async-handler";

//traer todos los mensajes
rutasMensajes.get("/", async (req, res) => {
    let mensajes = await mensajesDao.getAll();
    res.send(mensajes);
}
);

//trae mensajes enviados por un usuario
rutasMensajes.get("/user/:userId", async (req, res) => {
    const mensaje = await mensajesDao.getByUserId(req.params.userId);
    if (mensaje) {
        res.send(mensaje);
    } else {
        res.status(404).send({ message: 'no se pudo encontrar el mensaje' });
    }
}
);

//trae los mensajes recibidos por un usuario
rutasMensajes.get("/receiver/:receiver", async (req, res) => {
    const mensaje = await mensajesDao.getByReceiver(req.params.receiver);
    if (mensaje) {
        res.send(mensaje);
    } else {
        res.status(404).send({ message: 'no se pudo encontrar el mensaje' });
    }
}
);

//traer solo los mensajes no leidos
rutasMensajes.get("/unread", async (req, res) => {
    const mensajes = await mensajesDao.getUnreadMessages();
    res.send(mensajes);
}
);

//traer solo los mensajes leidos
rutasMensajes.get("/read", async (req, res) => {
    const mensajes = await mensajesDao.getReadMessages();
    res.send(mensajes);
}
);

//guardar un mensaje
rutasMensajes.post("/", async (req, res) => {
    const mensaje = await mensajesDao.save(req.body);
    if (mensaje) {
        res.send(mensaje);
    } else {
        res.status(404).send({ message: 'no se pudo guardar el mensaje' });
    }
}
);

rutasMensajes.post("admin/:id", async (req, res) => {
    //que se reciban los datos de req.body y que se le agregue el params.id en receptor
    const mensaje = req.body
    mensaje.receptor = req.params.id
    const mensajeGuardado = await mensajesDao.saveMessage(mensaje);
    
    if (mensajeGuardado) {
        res.send(mensajeGuardado);
    } else {
        res.status(404).send({ message: 'no se pudo encontrar el mensaje' });
    }
}
);

export default rutasMensajes;