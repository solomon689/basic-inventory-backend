import { NextFunction, Request, Response } from 'express';
import { DataSource, Repository } from 'typeorm';
import { Product } from '../../../modules/products/product.entity';
import { HttpStatus } from '../../enums/http-status';
import { TypeOrmError } from '../../errors/typeorm-error';

export class ProductMiddleware {
    private readonly productRepository: Repository<Product>;

    constructor(
        private readonly dataSource: DataSource,
    ) {
        this.productRepository = this.dataSource.getRepository(Product);

        this.productExist = this.productExist.bind(this);
    }

    public async productExist(req: Request, res: Response, next: NextFunction) {
        try {
            const productId: string = req.params.productId;
            const foundedProduct: Product | null = await this.productRepository
                .findOne({ where:  { id: productId } });

            if (!foundedProduct) return res.status(HttpStatus.NOT_FOUND)
                .json({ statusCode: HttpStatus.NOT_FOUND, message: 'El producto no existe' });

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