import logger from "../../../config/logger.js";
import  ContenedorMongoDB from "../../ContenedorMongoDB.js";

class OrdenDaoMongoDB extends ContenedorMongoDB {
	constructor() {
		super("Orden", {
			pedido: [],
			usuario: {type: String, required: true},
			metodoPago: {type: String, required: true},
			envio: {type: Object, required: true},
			total: {type: Number, required: true},
		}
		,
		{
			timestamps: true,
		}
		);
	}

	//hagamos un metodo asincrono llamado getbyuserid que reciba la id del usuario y que lo busque en la coleccion de ordenes y devuelva un objeto con todas las ordenes del usuario
	getByUserId = async (userId) => {
		const ordenes = await this.collection.find({usuario: userId});
		logger.info(ordenes);
		return ordenes;
	}

}

export default OrdenDaoMongoDB;