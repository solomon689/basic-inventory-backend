import { DataSource, Repository, UpdateResult, DeleteResult } from 'typeorm';
import { Category } from './category.entity';
import { DataBase } from '../../config/database';
import { BaseError } from '../../utils/errors/base-error';
import { HttpStatus } from '../../utils/enums/http-status';

export class CategoryService {
    private static instance: CategoryService;
    private readonly categoryRepository: Repository<Category>;

    private constructor(private readonly dataSource: DataSource) {
        this.categoryRepository = this.dataSource.getRepository(Category);
    }

    public static getInstance(): CategoryService {
        if (!CategoryService.instance) {
            return new CategoryService(DataBase.getInstance().getDataSource());
        }

        return CategoryService.instance;
    }

    public createCategory(category: any): Promise<Category> {
        const newCategory: Category = this.categoryRepository.create({
            name: category.name,
        });
        
        return this.categoryRepository.save(newCategory);   
    }

    public getCategories(): Promise<Category[]> {
        return this.categoryRepository.find();
    }

    public updateCategoryById(categoryId: string, newData: Partial<Category>): Promise<UpdateResult> {
        return this.dataSource
            .createQueryBuilder()
            .update(Category)
            .set(newData)
            .where({ id: categoryId })
            .returning('*')
            .execute();
    }

    public deteleCategoryById(categoryId: string): Promise<DeleteResult> {
        return this.categoryRepository.delete(categoryId);
    }
}