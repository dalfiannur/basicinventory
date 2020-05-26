// Product.ts
// 
// Author       Dikry Alfiannur Wahyu
// Email        dalfiannur@gmail.com
// Github       https://github.com/dalfiannur
// Created At   5/25/20

import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";

@Entity({
    name: 'Products'
})
export class Product {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    stock!: number;

    @CreateDateColumn()
    createdAt?: Date;

    @UpdateDateColumn()
    updatedAt?: Date;
}