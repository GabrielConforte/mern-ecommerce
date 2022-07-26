import  ContenedorMongoDB from "../../ContenedorMongoDB.js";

class MensajesDaoMongoDB extends ContenedorMongoDB {
	constructor() {
		super("mensajes", {
			mensaje: {type: String, required: true},
            usuario: {type: String, required: true, default: "anonimo"},
            idUsuario: {type: String, required: true, default: "anonimo"},
            receptor: {type: String, required: true, default: "admin"},
            fecha: {type: Date, default: Date.now},
            readed: {type: Boolean, default: false},
		}
		,
		{
			timestamps: true,
		}
		);
	}

    getByUserId = async (userId) => {
        const mensajes = await this.collection.find({idUsuario: userId});
        mensajes.sort((a, b) => {
            return b.fecha - a.fecha;
        }
        );
        return mensajes;
    }

    getAllMessages = async () => {
        const mensajes = await this.collection.find();
        mensajes.sort((a, b) => {
            return b.fecha - a.fecha;
        }
        );
        return mensajes;
    }

    getUnreadMessages = async () => {
        const mensajes = await this.collection.find({readed: false});
        mensajes.sort((a, b) => {
            return b.fecha - a.fecha;
        }
        );
        //cambiar el estado de los mensajes a leidos
        mensajes.forEach(async (mensaje) => {
            await this.collection.updateOne({_id: mensaje._id}, {$set: {readed: true}});
        }
        );
        return mensajes;
    }

    getReadMessages = async () => {
        const mensajes = await this.collection.find({readed: true});
        mensajes.sort((a, b) => {
            return b.fecha - a.fecha;
        }
        );
        return mensajes;
    }

    //cambiar el estado de 1 mensaje a leido
    setReaded = async (idMensaje) => {
        await this.collection.updateOne({_id: idMensaje}, {$set: {readed: true}});
    }


    //guardar mensaje
    saveMessage = async (mensaje) => {
        await this.collection.insertOne(mensaje);
    }

    getByReceiver = async (receiver) => {
        const mensajes = await this.collection.find({receptor: receiver});
        mensajes.sort((a, b) => {
            return b.fecha - a.fecha;
        }
        );
        return mensajes;
    }

}

export default MensajesDaoMongoDB;