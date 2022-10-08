import { Request, Response, NextFunction } from 'express';
import { Repository, DataSource } from 'typeorm';
import { Category } from '../../../modules/category/category.entity';
import { TypeOrmError } from '../../errors/typeorm-error';
import { HttpStatus } from '../../enums/http-status';

export class CategoryMiddleware {
    private readonly categoryRepository: Repository<Category>;

    constructor(private readonly dataSource: DataSource) {
        this.categoryRepository = this.dataSource.getRepository(Category);

        this.categoryExist = this.categoryExist.bind(this);
    }

    public async categoryExist(req: Request, res: Response, next: NextFunction) {
        try {
            const categoryId: string = req.params.categoryId;
            const foundedCategory: Category | null = await this.categoryRepository
                .findOne({ where: { id: categoryId } });

            if (!foundedCategory) {
                return res.status(HttpStatus.NOT_FOUND).json({
                    statusCode: HttpStatus.NOT_FOUND,
                    message: 'La categoria no existe',
                });
            }

            return next();
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