// InventoryController.ts
// 
// Author       Dikry Alfiannur Wahyu
// Email        dalfiannur@gmail.com
// Github       https://github.com/dalfiannur
// Created At   5/27/20

import {NextFunction, Request, Response} from "express";
import {getRepository, Repository} from "typeorm";
import {Inventory} from "../Entities/Inventory";
import {IFindAllInventories} from "../Requests/IInventoryRequest";
import {ParsePaginationRequest} from "../Helpers/PaginationHelper";

export class InventoryController {
    private readonly repository: Repository<Inventory> = getRepository(Inventory);

    public async findAll(req: IFindAllInventories, res: Response, next: NextFunction) {
        const { skip, page, take } = ParsePaginationRequest(req);

        const [inventories, total] = await this.repository
            .findAndCount({ skip, take })
            .catch((error: Error) => {
                throw next(error);
            });

        const pages = Math.ceil(total / take);

        return res.json({
            message: 'Successfully',
            data: {total, pages, inventories}
        });
    }

    public async findById(req: Request, res: Response, next: NextFunction) {
        const id = +req.params.id;
        const inventory = await this.repository.findOne(id);

        if (!inventory) throw next(new Error('Inventory not found'));

        return res.json({
            message: 'User found',
            data: inventory
        });
    }

    public async create(req: Request, res: Response, next: NextFunction) {
        const inventory = this.repository.create(req.body);

        await this.repository.insert(user)
            .catch((error: Error) => {
                throw next(error);
            });

        return res.json({
            message: 'User has been created.',
            data: inventory
        });
    }

    public async updateById(req: Request, res: Response, next: NextFunction) {
        const id = +req.params.id;
        const inventory = await this.repository.findOne(id);

        if (!inventory) throw next(new Error('User not found'));

        const prevData = inventory;

        inventory.isOut = req.body.name || inventory.isOut;
        inventory.quantity = req.body.username || inventory.quantity;

        await this.repository.save(user)
            .catch((error: Error) => {
                throw next(error);
            });

        return res.json({
            message: 'User has been updated.',
            data: {
                prev: prevData,
                current: user
            }
        });
    }

    public async deleteById(req: Request, res: Response, next: NextFunction) {
        const id = +req.params.id;
        const user = await this.repository.findOne(id);

        if (!user) throw next(new Error('User not found'));

        await this.repository.delete(id)
            .catch((error: Error) => {
                throw next(error);
            });

        return res.json({
            message: 'User has been deleted'
        });
    }
}