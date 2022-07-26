import { Server } from "socket.io";
import daos from "../models/daos/index.js";
const { mensajesDao } = daos;
export const sockets  = (servidor) => {
    const io = new Server(servidor, 
    {
        cors: {
        origins: '*:*',}
    });

//io
io.on('connection', (socket) => {
    socket.on('conectado', (data) => {
        mensajesDao.getByUserId(data.userId).then(mensajes => {
            socket.emit('mensajes', mensajes);
        }
        );
        io.emit('conectado', data);
    }
    );
    socket.on('disconnect', (data ) => {
        io.emit('desconectado', data);
    }
    );
    socket.on('mensaje', (data) => {
        const mensajeGuardar = {
            mensaje: data.mensaje,
            usuario: data.user,
            idUsuario: data.userId,
        };
        mensajesDao.save(mensajeGuardar).then(mensaje => {
            io.emit('mensaje', mensaje);
        }
        );
    }
    );

}
)}
// Compare this snippet from frontend\src\components\Socket.js:;

