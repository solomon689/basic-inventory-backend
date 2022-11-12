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
exports.CategoryMiddleware = void 0;
const category_entity_1 = require("../../../modules/category/category.entity");
const typeorm_error_1 = require("../../errors/typeorm-error");
const http_status_1 = require("../../enums/http-status");
class CategoryMiddleware {
    constructor(dataSource) {
        this.dataSource = dataSource;
        this.categoryRepository = this.dataSource.getRepository(category_entity_1.Category);
        this.categoryExist = this.categoryExist.bind(this);
    }
    categoryExist(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const categoryId = req.params.categoryId;
                const foundedCategory = yield this.categoryRepository
                    .findOne({ where: { id: categoryId } });
                if (!foundedCategory) {
                    return res.status(http_status_1.HttpStatus.NOT_FOUND).json({
                        statusCode: http_status_1.HttpStatus.NOT_FOUND,
                        message: 'La categoria no existe',
                    });
                }
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
exports.CategoryMiddleware = CategoryMiddleware;
//# sourceMappingURL=categories.middleware.js.map