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
exports.ProductMiddleware = void 0;
const product_entity_1 = require("../../../modules/products/product.entity");
const http_status_1 = require("../../enums/http-status");
const typeorm_error_1 = require("../../errors/typeorm-error");
class ProductMiddleware {
    constructor(dataSource) {
        this.dataSource = dataSource;
        this.productRepository = this.dataSource.getRepository(product_entity_1.Product);
        this.productExist = this.productExist.bind(this);
    }
    productExist(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const productId = req.params.productId;
                const foundedProduct = yield this.productRepository
                    .findOne({ where: { id: productId } });
                if (!foundedProduct)
                    return res.status(http_status_1.HttpStatus.NOT_FOUND)
                        .json({ statusCode: http_status_1.HttpStatus.NOT_FOUND, message: 'El producto no existe' });
                return next();
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
exports.ProductMiddleware = ProductMiddleware;
//# sourceMappingURL=product.middleware.js.map