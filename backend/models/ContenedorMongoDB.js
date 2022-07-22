import {mongoose} from 'mongoose';
import varEnv from '../config/index.js';
const {mongo_db} = varEnv;
const MONGO_URI = `mongodb+srv://${mongo_db.mongo_uri}/${mongo_db.mongo_name}?retryWrites=true&w=majority`// || "https://localhost:27017/sistema";
import  logger  from '../config/logger.js';

(async () => {
	try {
		await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,});
		logger.info("Database conectada");
	} catch (error) {
		logger.error(error);
		logger.error("No se puede conectar a la base de datos");
		process.exit(1)	
	}
	
})();

class ContenedorMongoDB {
	constructor(collection, schema) {
		this.collection = mongoose.model(collection, schema);
	}

	async getAll() {
		try {
			const data = await this.collection.find({}, {__v: 0});
			return data;
		} catch (error) {
			logger.error("no se puede leer el archivo");
		}
	}

	async getById(id) {
		try {
			const data = await this.collection.findOne({_id: id});
			return data;
		} catch (error) {
			logger.error("no se pudo leer el archivo");
		}
	}

	async save(objeto) {
		try {
			logger.info(objeto)
			await this.collection.create(objeto);
			return objeto.title;
		} catch (error) {
			if (error.code == 11000) {
				return "El objeto ya existe";
			}else{
				logger.error("no se puede guardar el archivo ->" + error);
			}
			
		}
	}

	async editById(id, obj) {
		try {
			const dataUpdate = await this.collection.findOneAndUpdate(id, obj, {
				new: true,
			});
			return dataUpdate;
		} catch (error) {
			logger.error("no se puede editar");
		}
	}
	async delete(id) {
		try {
			logger.info(`se va a eliminar el id: ${id}`);
			const data = await this.collection.findOneAndDelete({"id": id});
			return data.title;
		} catch (error) {
			logger.error("no se puede eliminar");
		}
	}

	async add(data) {
		try {
			await this.collection({user: data, timestamps: new Date(), items: []} ).save();
		} catch (error) {
			logger.error("no se puede crear");
		}
	}

	async update(id, data) {
		try {
			const dataUpdate = await this.collection.findByIdAndUpdate(id, data, {
				new: true,
			});
			return dataUpdate;
		}catch (error) {
			logger.error("no se puede actualizar");
		}
}
	async getBySlug(slug) {
		try {
			const data = await this.collection.findOne({"slug": slug});
			return data;
		} catch (error) {
			logger.error("no se puede leer el archivo");
		}
	}
}

export default ContenedorMongoDB;
