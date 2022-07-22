import ProductosDaoMongoDB from "./productos/ProductosDaoMongoDB.js";
import UserDaoMongoDB from "./user/UserDaoMongoDB.js";
//import AdminDaoMongoDB from "./admin/AdminDaoMongoDB.js";

let productosDao;
let isAdmin;
let userDao;

		
			productosDao = new ProductosDaoMongoDB();
			userDao = new UserDaoMongoDB();
			//isAdmin = new AdminDaoMongoDB();

		const daos = {
			productosDao,
			userDao,
			//isAdmin,
		};
		

export default daos;