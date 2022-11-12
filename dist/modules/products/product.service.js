"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const product_entity_1 = require("./product.entity");
const database_1 = require("../../config/database");
class ProductService {
    constructor(dataSource) {
        this.dataSource = dataSource;
        this.productRepository = dataSource.getRepository(product_entity_1.Product);
    }
    static getInstance() {
        if (!ProductService.instance) {
            return new ProductService(database_1.DataBase.getInstance().getDataSource());
        }
        else {
            return ProductService.instance;
        }
    }
    createProduct(product) {
        const newProduct = this.productRepository.create({
            name: product.name,
            description: product.description,
            price: product.price,
            stock: product.stock,
            categories: product.categories,
        });
        return this.productRepository.save(newProduct);
    }
    getProductById(productId) {
        return this.productRepository.findOne({
            relations: { categories: true },
            where: { id: productId },
        });
    }
    getProducts() {
        return this.productRepository.find({ relations: { categories: true } });
    }
    editProductById(productId, newData) {
        const updatedProduct = this.dataSource
            .createQueryBuilder()
            .update(product_entity_1.Product)
            .set(newData)
            .where({ id: productId })
            .returning('*')
            .execute();
        return updatedProduct;
    }
    deleteProductById(productId) {
        return this.productRepository.delete(productId);
    }
}
exports.ProductService = ProductService;
//# sourceMappingURL=product.service.js.map