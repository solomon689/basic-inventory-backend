"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryServer = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const category_routes_1 = __importDefault(require("../routes/category.routes"));
const product_routes_1 = __importDefault(require("../routes/product.routes"));
class InventoryServer {
    constructor(dataSource) {
        this.dataSource = dataSource;
        this.paths = {
            category: '/api/category',
            product: '/api/product',
        };
        this.app = (0, express_1.default)();
        this.middlewares();
        this.connectDataBase();
        this.routes();
    }
    listen(port) {
        this.app.listen(port, () => {
            console.log('Servidor corriendo en el puerto ', port);
        });
    }
    middlewares() {
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
    }
    routes() {
        this.app.use(this.paths.category, category_routes_1.default);
        this.app.use(this.paths.product, product_routes_1.default);
    }
    connectDataBase() {
        this.dataSource.initialize()
            .then(() => console.log('Base de datos conectada correctamente'))
            .catch((error) => console.error('Ha ocurrido un error al momento de iniciar la base de datos', error));
    }
}
exports.InventoryServer = InventoryServer;
//# sourceMappingURL=inventory-server.js.map