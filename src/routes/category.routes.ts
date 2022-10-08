import { Router } from "express";
import { CategoryController } from "../modules/category/category.controller";
import { CategoryService } from '../modules/category/category.service';
import { CategoryMiddleware } from '../utils/middlewares/categories/categories.middleware';
import { DataBase } from '../config/database';

const router = Router();

const categoryController = new CategoryController(CategoryService.getInstance());
const categoryMiddleware = new CategoryMiddleware(DataBase.getInstance().getDataSource());

router.post('/', categoryController.createCategory);
router.get('/', categoryController.getCategories);
router.put('/:categoryId', [
    categoryMiddleware.categoryExist,
], categoryController.updateCategoryById);
router.delete('/:categoryId', [
    categoryMiddleware.categoryExist,
] , categoryController.deleteCategoryById);

export default router;