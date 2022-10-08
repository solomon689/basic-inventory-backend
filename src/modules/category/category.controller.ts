import { Request, Response } from "express";
import { CategoryService } from './category.service';
import { Category } from './category.entity';
import { TypeOrmError } from '../../utils/errors/typeorm-error';
import { HttpStatus } from '../../utils/enums/http-status';
import { UpdateResult, DeleteResult } from 'typeorm';

export class CategoryController {

    constructor(
        private readonly categoryService: CategoryService,
    ) {
        this.createCategory = this.createCategory.bind(this);
        this.getCategories = this.getCategories.bind(this);
        this.updateCategoryById = this.updateCategoryById.bind(this);
        this.deleteCategoryById = this.deleteCategoryById.bind(this);
    }

    public async createCategory(req: Request, res: Response) {
        try {
            const createdCategory: Category = await this.categoryService.createCategory(req.body);

            return res.status(201).json(createdCategory);   
        } catch (error) {
            console.error(error);
            const customOrmError: TypeOrmError = new TypeOrmError(error);

            return res.status(customOrmError.getStatusCode).json({
                statusCode: customOrmError.getStatusCode,
                message: customOrmError.message,
            });
        }
    }

    public async getCategories(req: Request, res: Response) {
        try {
            const foundedCategories: Category[] = await this.categoryService
                .getCategories();
            console.log(foundedCategories);
            if (!foundedCategories || foundedCategories.length === 0) {
                return res.status(HttpStatus.NO_CONTENT).json();
            }

            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                message: 'Información encontrada con exito!',
                data: foundedCategories,
            });
        } catch (error) {
            console.error(error);
            const customError = new TypeOrmError(error);

            return res.status(customError.getStatusCode).json({
                statusCode: customError.getStatusCode,
                message: customError.getMessage,
            });
        }
    }

    public async updateCategoryById(req: Request, res: Response) {
        try {
            const categoryId: string = req.params.categoryId;
            const newData: Partial<Category> = req.body;
            const updatedCategory: UpdateResult = await this.categoryService
                .updateCategoryById(categoryId, newData);

            if (updatedCategory.affected === 0) {
                return res.status(HttpStatus.OK).json({
                    statusCode: HttpStatus.OK,
                    message: 'Petición realizada pero sin actualización',
                });
            }

            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                message: 'Categoria actualizada con exito!',
            });
        } catch (error) {
            console.error(error);
            const customError: TypeOrmError = new TypeOrmError(error);

            return res.status(customError.getStatusCode).json({
                statusCode: customError.getStatusCode,
                message: customError.getMessage,
            });
        }
    }

    public async deleteCategoryById(req: Request, res: Response) {
        try {
            const categoryId: string = req.params.categoryId;
            const deletedCategory: DeleteResult = await this.categoryService
                .deteleCategoryById(categoryId);

            if (deletedCategory.affected === 0) {
                return res.status(HttpStatus.OK).json({
                    statusCode: HttpStatus.OK,
                    message: 'Petición realizada pero sin eliminar',
                });
            }

            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                message: 'Categoria eliminada con exito!',
            });
        } catch (error) {
            console.error(error);
            const customError: TypeOrmError = new TypeOrmError(error);

            return res.status(customError.getStatusCode).json({
                statusCode: customError.getStatusCode,
                message: customError.getMessage,
            });
        }
    }
}