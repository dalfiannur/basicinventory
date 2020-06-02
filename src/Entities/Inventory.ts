// Inventory.ts
// 
// Author       Dikry Alfiannur Wahyu
// Email        dalfiannur@gmail.com
// Github       https://github.com/dalfiannur
// Created At   5/25/20

import {
    Column,
    CreateDateColumn,
    Entity, JoinColumn, JoinTable,
    ManyToOne, OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {User} from "./User";

@Entity({
    name: 'Inventories'
})
export class Inventory {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    createdById!: number;

    @Column()
    updatedById?: number;

    @Column()
    isOut!: boolean;

    @Column()
    quantity!: number;

    @OneToOne(type => User)
    @JoinColumn()
    createdBy!: User;

    @OneToOne(type => User)
    @JoinColumn()
    updatedBy?: User;

    @CreateDateColumn()
    createdAt?: Date;

    @UpdateDateColumn()
    updatedAt?: Date;
}