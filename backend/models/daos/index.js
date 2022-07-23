import ProductosDaoMongoDB from "./productos/ProductosDaoMongoDB.js";
import UserDaoMongoDB from "./user/UserDaoMongoDB.js";
import OrdenDaoMongoDB from "./ordenes/OrdenDaoMongoDB.js";

let productosDao;
let ordenesDao;
let userDao;

	productosDao = new ProductosDaoMongoDB();
	userDao = new UserDaoMongoDB();
	ordenesDao = new OrdenDaoMongoDB();

		const daos = {
			productosDao,
			userDao,
			ordenesDao
		};
		

export default daos;