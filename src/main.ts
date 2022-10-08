import * as dotenv from 'dotenv';
import { InventoryServer } from './config/inventory-server';
import { DataBase } from './config/database';

const result = dotenv.config();

const server: InventoryServer = new InventoryServer(DataBase.getInstance().getDataSource());
server.listen(process.env.PORT || '3000');