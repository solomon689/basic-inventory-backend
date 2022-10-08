import { Product } from "./product.entity";
import { DataSource, DeleteResult, Repository, UpdateResult } from 'typeorm';
import { DataBase } from '../../config/database';

export class ProductService {
    private static instance: ProductService;
    private readonly productRepository: Repository<Product>;

    private constructor(
        private readonly dataSource: DataSource,
    ) {
        this.productRepository = dataSource.getRepository(Product);
    }

    public static getInstance() {
        if (!ProductService.instance) {
            return new ProductService(DataBase.getInstance().getDataSource());
        } else {
            return ProductService.instance;
        }
    }

    public createProduct(product: any): Promise<Product> {
        const newProduct: Product = this.productRepository.create({
            name: product.name,
            description: product.description,
            price: product.price,
            stock: product.stock,
            categories: product.categories,
        });

        return this.productRepository.save(newProduct);
    }

    public getProductById(productId: string): Promise<Product | null> {
        return this.productRepository.findOne({
            relations: { categories: true },
            where: { id: productId },
        });
    }

    public getProducts(): Promise<Product[]> {
        return this.productRepository.find({ relations: { categories: true } });
    }

    public editProductById(productId: string, newData: Partial<Product>): Promise<UpdateResult> {
        const updatedProduct: Promise<UpdateResult> = this.dataSource
            .createQueryBuilder()
            .update(Product)
            .set(newData)
            .where({ id: productId })
            .returning('*')
            .execute();

        return updatedProduct;
    }

    public deleteProductById(productId: string): Promise<DeleteResult> {
        return this.productRepository.delete(productId);
    }
}