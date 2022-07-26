import ProductosDaoMongoDB from "./productos/ProductosDaoMongoDB.js";
import UserDaoMongoDB from "./user/UserDaoMongoDB.js";
import OrdenDaoMongoDB from "./ordenes/OrdenDaoMongoDB.js";
import MensajesDaoMongoDB from "./mensajes/MensajesDaoMongoDB.js";

let productosDao;
let ordenesDao;
let userDao;
let mensajesDao;

	productosDao = new ProductosDaoMongoDB();
	userDao = new UserDaoMongoDB();
	ordenesDao = new OrdenDaoMongoDB();
	mensajesDao = new MensajesDaoMongoDB();

		const daos = {
			productosDao,
			userDao,
			ordenesDao,
			mensajesDao
		};
		

export default daos;