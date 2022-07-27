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
        io.emit('conectado', data);
    }
    );

    //recibe por data el id del usuario y se le envia sus mensajes con su id
    socket.on('getMensaje', (data) => {
        mensajesDao.getByUserId(data.id).then(mensajes => {
            io.emit('getMensaje', mensajes);
        }
        );
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
        )
    }
    );

    //emite todos los mensajes
    socket.on('mensajesUser', (data) => {
        if(data.user)
        mensajesDao.getByUserId(data.user).then(mensajes => {
            io.emit('mensajesUser', mensajes);
        }
        );
    }
    );


    socket.on('todosMensajes', () => {
        mensajesDao.getAll().then(mensajes => {
            io.emit('todosMensajes', mensajes);
        });
    }
    );

    socket.on('mensajesAdmin', (data) => {
        const mensajeGuardar = {
            mensaje: data.mensaje,
            usuario: "Admin",
            idUsuario: data.userId,
            receptor: data.user,
        };
        mensajesDao.save(mensajeGuardar).then(mensaje => {
            io.emit('mensaje', mensaje);
        }
        )
    }
    );
});};
