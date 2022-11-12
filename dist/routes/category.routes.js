"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const category_controller_1 = require("../modules/category/category.controller");
const category_service_1 = require("../modules/category/category.service");
const categories_middleware_1 = require("../utils/middlewares/categories/categories.middleware");
const database_1 = require("../config/database");
const router = (0, express_1.Router)();
const categoryController = new category_controller_1.CategoryController(category_service_1.CategoryService.getInstance());
const categoryMiddleware = new categories_middleware_1.CategoryMiddleware(database_1.DataBase.getInstance().getDataSource());
router.post('/', categoryController.createCategory);
router.get('/', categoryController.getCategories);
router.put('/:categoryId', [
    categoryMiddleware.categoryExist,
], categoryController.updateCategoryById);
router.delete('/:categoryId', [
    categoryMiddleware.categoryExist,
], categoryController.deleteCategoryById);
exports.default = router;
//# sourceMappingURL=category.routes.js.map