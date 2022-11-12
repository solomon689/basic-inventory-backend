"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_controller_1 = require("../modules/products/product.controller");
const product_service_1 = require("../modules/products/product.service");
const product_middleware_1 = require("../utils/middlewares/products/product.middleware");
const database_1 = require("../config/database");
const router = (0, express_1.Router)();
const productController = new product_controller_1.ProductController(product_service_1.ProductService.getInstance());
const productMiddleware = new product_middleware_1.ProductMiddleware(database_1.DataBase.getInstance().getDataSource());
router.post('/', productController.createProduct);
router.get('/:id', productController.getProductById);
router.get('/', productController.getProducts);
router.put('/:productId', [productMiddleware.productExist], productController.updateProductById);
router.delete('/:productId', [
    productMiddleware.productExist,
], productController.deleteProductById);
exports.default = router;
//# sourceMappingURL=product.routes.js.map