import { Router } from "express";
import { ProductController } from '../modules/products/product.controller';
import { ProductService } from '../modules/products/product.service';
import { ProductMiddleware } from '../utils/middlewares/products/product.middleware';
import { DataBase } from '../config/database';

const router = Router();
const productController: ProductController = new ProductController(
    ProductService.getInstance(),
);
const productMiddleware: ProductMiddleware = new ProductMiddleware(
    DataBase.getInstance().getDataSource()
);

router.post('/', productController.createProduct);
router.get('/:id', productController.getProductById);
router.get('/', productController.getProducts);
router.put('/:productId',
[ productMiddleware.productExist ],
productController.updateProductById);
router.delete('/:productId', [
    productMiddleware.productExist,
], productController.deleteProductById);

export default router;
