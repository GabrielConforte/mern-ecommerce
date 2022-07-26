import  ContenedorMongoDB from "../../ContenedorMongoDB.js";

class ProductosDaoMongoDB extends ContenedorMongoDB {
	constructor() {
		super("producto", {
			name: {type: String, required: true},
			price: {type: Number, required: true},
			slug: {type: String, required: true},
			description: {type: String, required: true},
			image: {type: String, required: true},
			stock: {type: Number, required: true},
			rating: {type: Number, required: true},
			numReviews: {type: Number, required: true},
		}
		,
		{
			timestamps: true,
		}
		);
	}
	getWithFilters = async (filters) => {
		const products = await this.collection.find({
			...filters.query,
			...filters.categoria,
			...filters.precio,
			...filters.rating,
		}).sort(filters.orden).skip(filters.paginaTam * filters.pagina - 1 ).limit(filters.paginaTam)
		const contProducts = await this.collection.countDocuments({
			...filters.query,
			...filters.categoria,
			...filters.precio,
			...filters.rating,
		});
		return {products,contProducts, pagina: filters.pagina, paginas: Math.ceil(contProducts / filters.paginaTam)};
	}

}

export default ProductosDaoMongoDB;