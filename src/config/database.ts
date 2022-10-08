import { DataSource } from "typeorm";
import * as dotenv from 'dotenv';

const result = dotenv.config();

export class DataBase {
    private static instance: DataBase;
    private dataSource: DataSource;

    private constructor() {
        this.dataSource = new DataSource({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: process.env.DATABASE_USERNAME,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_NAME,
            entities: [__dirname + '/../**/*.entity{.ts,.js}'],
            synchronize: false,
        });
    }

    public static getInstance(): DataBase {
        if (!DataBase.instance) {
            DataBase.instance = new DataBase();
        }

        return DataBase.instance;
    }

    public getDataSource(): DataSource {
        return this.dataSource;
    }
}