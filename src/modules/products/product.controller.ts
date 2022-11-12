import { Request, Response } from "express";
import { TypeOrmError } from '../../utils/errors/typeorm-error';
import { Product } from './product.entity';
import { ProductService } from './product.service';
import { HttpStatus } from '../../utils/enums/http-status';
import { UpdateResult, DeleteResult } from 'typeorm';

export class ProductController {
    constructor(
        private readonly productService: ProductService,
    ) {
        
        this.createProduct = this.createProduct.bind(this);
        this.getProductById = this.getProductById.bind(this);
        this.getProducts = this.getProducts.bind(this);
        this.updateProductById = this.updateProductById.bind(this);
        this.deleteProductById = this.deleteProductById.bind(this);
    }

    public async createProduct(req: Request, res: Response) {
        try {
            const createdProduct: Product = await this.productService
                .createProduct(req.body);

            return res.status(HttpStatus.CREATED).json({
                statusCode: HttpStatus.CREATED,
                message: 'Producto creado con exito!',
                data: createdProduct,
            });
        } catch (error) {
            console.error(error);
            const customError: TypeOrmError = new TypeOrmError(error);

            res.status(customError.getStatusCode).json({
                statusCode: customError.getStatusCode,
                message: customError.getMessage,
            });
        }
    }

    public async getProductById(req: Request, res: Response) {
        try {
            const foundedProduct: Product | null = await this.productService
                .getProductById(req.body.productId);

            if (!foundedProduct) return res
                .status(HttpStatus.NOT_FOUND)
                .json({ statusCode: HttpStatus.NOT_FOUND, message: 'Producto no encontrado' });

            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                message: 'Producto encontrado con exito!',
                data: foundedProduct,
            })
        } catch (error) {
            console.error(error);
            const customError: TypeOrmError = new TypeOrmError(error);

            res.status(customError.getStatusCode).json({
                statusCode: customError.getStatusCode,
                message: customError.getMessage,
            });
        }
    }

    public async getProducts(req: Request, res: Response) {
        try {
            const foundedProducts: Product[] = await this.productService
                .getProducts();

            if (foundedProducts.length === 0) return res.status(HttpStatus.NO_CONTENT).json();

            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                message: 'Productos encontrados con exito!',
                data: foundedProducts,
            })
        } catch (error) {
            console.error(error);
            const customError: TypeOrmError = new TypeOrmError(error);

            res.status(customError.getStatusCode).json({
                statusCode: customError.getStatusCode,
                message: customError.getMessage,
            });
        }
    }

    public async updateProductById(req: Request, res: Response) {
        try {
            const productId: string = req.params.productId;
            const newData: any = req.body;            
            const updatedProduct: UpdateResult = await this.productService
                .editProductById(productId, newData);

            if (updatedProduct.affected === 0) {
                return res.status(HttpStatus.OK).json({
                    statusCode: HttpStatus.OK,
                    message: 'Petición realiza pero sin actualización',
                });
            }

            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                message: 'Producto actualizado con exito!',
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

    public async deleteProductById(req: Request, res: Response) {
        try {
            const productId: string = req.params.productId;
            const deletedProduct: DeleteResult = await this.productService
                .deleteProductById(productId);

            if (deletedProduct.affected === 0) {
                return res.status(HttpStatus.OK).json({
                    statusCode: HttpStatus.OK,
                    message: 'Petición realizada pero sin eliminación',
                });
            }

            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                message: 'Producto eliminado con exito!',
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