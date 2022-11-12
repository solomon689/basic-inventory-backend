"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const typeorm_error_1 = require("../../utils/errors/typeorm-error");
const http_status_1 = require("../../utils/enums/http-status");
class ProductController {
    constructor(productService) {
        this.productService = productService;
        this.createProduct = this.createProduct.bind(this);
        this.getProductById = this.getProductById.bind(this);
        this.getProducts = this.getProducts.bind(this);
        this.updateProductById = this.updateProductById.bind(this);
        this.deleteProductById = this.deleteProductById.bind(this);
    }
    createProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const createdProduct = yield this.productService
                    .createProduct(req.body);
                return res.status(http_status_1.HttpStatus.CREATED).json({
                    statusCode: http_status_1.HttpStatus.CREATED,
                    message: 'Producto creado con exito!',
                    data: createdProduct,
                });
            }
            catch (error) {
                console.error(error);
                const customError = new typeorm_error_1.TypeOrmError(error);
                res.status(customError.getStatusCode).json({
                    statusCode: customError.getStatusCode,
                    message: customError.getMessage,
                });
            }
        });
    }
    getProductById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const foundedProduct = yield this.productService
                    .getProductById(req.body.productId);
                if (!foundedProduct)
                    return res
                        .status(http_status_1.HttpStatus.NOT_FOUND)
                        .json({ statusCode: http_status_1.HttpStatus.NOT_FOUND, message: 'Producto no encontrado' });
                return res.status(http_status_1.HttpStatus.OK).json({
                    statusCode: http_status_1.HttpStatus.OK,
                    message: 'Producto encontrado con exito!',
                    data: foundedProduct,
                });
            }
            catch (error) {
                console.error(error);
                const customError = new typeorm_error_1.TypeOrmError(error);
                res.status(customError.getStatusCode).json({
                    statusCode: customError.getStatusCode,
                    message: customError.getMessage,
                });
            }
        });
    }
    getProducts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const foundedProducts = yield this.productService
                    .getProducts();
                if (foundedProducts.length === 0)
                    return res.status(http_status_1.HttpStatus.NO_CONTENT).json();
                return res.status(http_status_1.HttpStatus.OK).json({
                    statusCode: http_status_1.HttpStatus.OK,
                    message: 'Productos encontrados con exito!',
                    data: foundedProducts,
                });
            }
            catch (error) {
                console.error(error);
                const customError = new typeorm_error_1.TypeOrmError(error);
                res.status(customError.getStatusCode).json({
                    statusCode: customError.getStatusCode,
                    message: customError.getMessage,
                });
            }
        });
    }
    updateProductById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const productId = req.params.productId;
                const newData = req.body;
                const updatedProduct = yield this.productService
                    .editProductById(productId, newData);
                if (updatedProduct.affected === 0) {
                    return res.status(http_status_1.HttpStatus.OK).json({
                        statusCode: http_status_1.HttpStatus.OK,
                        message: 'Petición realiza pero sin actualización',
                    });
                }
                return res.status(http_status_1.HttpStatus.OK).json({
                    statusCode: http_status_1.HttpStatus.OK,
                    message: 'Producto actualizado con exito!',
                });
            }
            catch (error) {
                console.error(error);
                const customError = new typeorm_error_1.TypeOrmError(error);
                return res.status(customError.getStatusCode).json({
                    statusCode: customError.getStatusCode,
                    message: customError.getMessage,
                });
            }
        });
    }
    deleteProductById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const productId = req.params.productId;
                const deletedProduct = yield this.productService
                    .deleteProductById(productId);
                if (deletedProduct.affected === 0) {
                    return res.status(http_status_1.HttpStatus.OK).json({
                        statusCode: http_status_1.HttpStatus.OK,
                        message: 'Petición realizada pero sin eliminación',
                    });
                }
                return res.status(http_status_1.HttpStatus.OK).json({
                    statusCode: http_status_1.HttpStatus.OK,
                    message: 'Producto eliminado con exito!',
                });
            }
            catch (error) {
                console.error(error);
                const customError = new typeorm_error_1.TypeOrmError(error);
                return res.status(customError.getStatusCode).json({
                    statusCode: customError.getStatusCode,
                    message: customError.getMessage,
                });
            }
        });
    }
}
exports.ProductController = ProductController;
//# sourceMappingURL=product.controller.js.map