import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from '../category/category.entity';

@Entity()
export class Product {
    @PrimaryGeneratedColumn('uuid')
    public id?: string;

    @Column({ type: 'varchar', length: 100 })
    public name!: string;

    @Column({ type: 'int4' })
    public stock!: number;

    @Column({ type: 'float' })
    public price!: number;

    @Column({ type: 'text' })
    public description!: string;

    @ManyToMany(() => Category)
    @JoinTable()
    public categories!: Category[];
}