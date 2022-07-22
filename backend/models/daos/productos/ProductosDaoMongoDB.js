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
}

export default ProductosDaoMongoDB;