import express, { Application } from "express";
import cors from 'cors';
import categoryRoutes from '../routes/category.routes';
import productRoutes from '../routes/product.routes';
import { DataSource } from 'typeorm';

export class InventoryServer {
    private app: Application;
    private paths = {
        category: '/api/category',
        product: '/api/product',
    };

    constructor(
        private readonly dataSource: DataSource,
    ) {
        this.app = express();
        
        this.middlewares();
        this.connectDataBase();
        this.routes();
    }

    public listen(port: string | number) {
        this.app.listen(port, () => {
            console.log('Servidor corriendo en el puerto ', port);
        });
    }

    private middlewares(): void {
        this.app.use(cors());
        this.app.use(express.json());
    }

    private routes(): void {
        this.app.use(this.paths.category, categoryRoutes);
        this.app.use(this.paths.product, productRoutes);
    }

    private connectDataBase(): void {
        this.dataSource.initialize()
            .then(() => console.log('Base de datos conectada correctamente'))
            .catch((error) => console.error('Ha ocurrido un error al momento de iniciar la base de datos', error));
    }
}