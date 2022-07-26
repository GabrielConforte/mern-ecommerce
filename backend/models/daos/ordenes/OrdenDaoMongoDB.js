import  ContenedorMongoDB from "../../ContenedorMongoDB.js";

class OrdenDaoMongoDB extends ContenedorMongoDB {
	constructor() {
		super("Orders", {
			pedido: [],
			usuario: {type: String, required: true},
			metodoPago: {type: String, required: true},
			envio: {type: Object, required: true},
			total: {type: Number, required: true},timestamps: {type: Date, default: Date.now},
			statusEnv: {type: String, required: true, default: "Pendiente"},
			statusPag: {type: String, required: true, default: "Pendiente"},
		}
		);
	}

	//hagamos un metodo asincrono llamado getbyuserid que reciba la id del usuario y que lo busque en la coleccion de ordenes y devuelva un objeto con todas las ordenes del usuario
	getByUserId = async (userId) => {
		const ordenes = await this.collection.find({usuario: userId});
		return ordenes;
	}

}

export default OrdenDaoMongoDB;