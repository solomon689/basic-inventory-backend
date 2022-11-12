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
exports.CategoryController = void 0;
const typeorm_error_1 = require("../../utils/errors/typeorm-error");
const http_status_1 = require("../../utils/enums/http-status");
class CategoryController {
    constructor(categoryService) {
        this.categoryService = categoryService;
        this.createCategory = this.createCategory.bind(this);
        this.getCategories = this.getCategories.bind(this);
        this.updateCategoryById = this.updateCategoryById.bind(this);
        this.deleteCategoryById = this.deleteCategoryById.bind(this);
    }
    createCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const createdCategory = yield this.categoryService.createCategory(req.body);
                return res.status(201).json(createdCategory);
            }
            catch (error) {
                console.error(error);
                const customOrmError = new typeorm_error_1.TypeOrmError(error);
                return res.status(customOrmError.getStatusCode).json({
                    statusCode: customOrmError.getStatusCode,
                    message: customOrmError.message,
                });
            }
        });
    }
    getCategories(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const foundedCategories = yield this.categoryService
                    .getCategories();
                console.log(foundedCategories);
                if (!foundedCategories || foundedCategories.length === 0) {
                    return res.status(http_status_1.HttpStatus.NO_CONTENT).json();
                }
                return res.status(http_status_1.HttpStatus.OK).json({
                    statusCode: http_status_1.HttpStatus.OK,
                    message: 'Información encontrada con exito!',
                    data: foundedCategories,
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
    updateCategoryById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const categoryId = req.params.categoryId;
                const newData = req.body;
                const updatedCategory = yield this.categoryService
                    .updateCategoryById(categoryId, newData);
                if (updatedCategory.affected === 0) {
                    return res.status(http_status_1.HttpStatus.OK).json({
                        statusCode: http_status_1.HttpStatus.OK,
                        message: 'Petición realizada pero sin actualización',
                    });
                }
                return res.status(http_status_1.HttpStatus.OK).json({
                    statusCode: http_status_1.HttpStatus.OK,
                    message: 'Categoria actualizada con exito!',
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
    deleteCategoryById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const categoryId = req.params.categoryId;
                const deletedCategory = yield this.categoryService
                    .deteleCategoryById(categoryId);
                if (deletedCategory.affected === 0) {
                    return res.status(http_status_1.HttpStatus.OK).json({
                        statusCode: http_status_1.HttpStatus.OK,
                        message: 'Petición realizada pero sin eliminar',
                    });
                }
                return res.status(http_status_1.HttpStatus.OK).json({
                    statusCode: http_status_1.HttpStatus.OK,
                    message: 'Categoria eliminada con exito!',
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
exports.CategoryController = CategoryController;
//# sourceMappingURL=category.controller.js.map