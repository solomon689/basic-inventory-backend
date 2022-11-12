"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryService = void 0;
const category_entity_1 = require("./category.entity");
const database_1 = require("../../config/database");
class CategoryService {
    constructor(dataSource) {
        this.dataSource = dataSource;
        this.categoryRepository = this.dataSource.getRepository(category_entity_1.Category);
    }
    static getInstance() {
        if (!CategoryService.instance) {
            return new CategoryService(database_1.DataBase.getInstance().getDataSource());
        }
        return CategoryService.instance;
    }
    createCategory(category) {
        const newCategory = this.categoryRepository.create({
            name: category.name,
        });
        return this.categoryRepository.save(newCategory);
    }
    getCategories() {
        return this.categoryRepository.find();
    }
    updateCategoryById(categoryId, newData) {
        return this.dataSource
            .createQueryBuilder()
            .update(category_entity_1.Category)
            .set(newData)
            .where({ id: categoryId })
            .returning('*')
            .execute();
    }
    deteleCategoryById(categoryId) {
        return this.categoryRepository.delete(categoryId);
    }
}
exports.CategoryService = CategoryService;
//# sourceMappingURL=category.service.js.map