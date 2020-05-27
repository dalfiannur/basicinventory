// Inventory.ts
// 
// Author       Dikry Alfiannur Wahyu
// Email        dalfiannur@gmail.com
// Github       https://github.com/dalfiannur
// Created At   5/25/20

import {
    Column,
    CreateDateColumn,
    Entity, JoinColumn,
    ManyToOne,
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
    createdByUserId!: number;

    @Column()
    updatedByUserId?: number;

    @Column()
    isOut!: boolean;

    @Column()
    quantity!: number;

    @ManyToOne(type => User)
    @JoinColumn({
        referencedColumnName: 'createdByUserId'
    })
    createdBy!: User;

    @ManyToOne(type => User)
    @JoinColumn({
        referencedColumnName: 'updatedByUserId'
    })
    updatedBy?: User;

    @CreateDateColumn()
    createdAt?: Date;

    @UpdateDateColumn()
    updatedAt?: Date;
}