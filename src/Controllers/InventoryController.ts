// InventoryController.ts
// 
// Author       Dikry Alfiannur Wahyu
// Email        dalfiannur@gmail.com
// Github       https://github.com/dalfiannur
// Created At   5/27/20

import {NextFunction, Request, Response} from "express";
import {getRepository, Repository} from "typeorm";
import {Inventory} from "../Entities/Inventory";
import {ICreateInventory, IFindAllInventories, IUpdateInventory} from "../Requests/InventoryRequest";
import {ParsePaginationRequest} from "../Helpers/PaginationHelper";

export class InventoryController {
    private readonly repository: Repository<Inventory> = getRepository(Inventory);

    public findAllInventories = async (req: IFindAllInventories, res: Response, next: NextFunction) => {
        const { skip, take } = ParsePaginationRequest(req);

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

    public findById = async (req: Request, res: Response, next: NextFunction) => {
        const id = +req.params.id;
        const inventory = await this.repository.findOne(id, {
            relations: ['createdBy', 'updatedBy']
        });

        if (!inventory) throw next(new Error('Inventory not found'));

        return res.json({
            message: 'Inventory found',
            data: inventory
        });
    }

    public create = async (req: ICreateInventory, res: Response, next: NextFunction) => {
        req.body.createdByUserId = req.user.id;
        const inventory = this.repository.create(req.body);

        await this.repository.insert(inventory)
            .catch((error: Error) => {
                throw next(error);
            });

        return res.json({
            message: 'User has been created.',
            data: inventory
        });
    }

    public updateById = async (req: IUpdateInventory, res: Response, next: NextFunction) => {
        const id = +req.params.id;
        const inventory = await this.repository.findOne(id);

        if (!inventory) throw next(new Error('User not found'));

        const prevData = inventory;

        inventory.isOut = req.body.isOut || inventory.isOut;
        inventory.quantity = req.body.quantity || inventory.quantity;
        inventory.updatedByUserId = req.user.id;

        await this.repository.save(inventory)
            .catch((error: Error) => {
                throw next(error);
            });

        return res.json({
            message: 'Inventory has been updated.',
            data: {
                prev: prevData,
                current: inventory
            }
        });
    }

    public deleteById = async (req: Request, res: Response, next: NextFunction) => {
        const id = +req.params.id;
        const user = await this.repository.findOne(id);

        if (!user) throw next(new Error('Inventory not found'));

        await this.repository.delete(id)
            .catch((error: Error) => {
                throw next(error);
            });

        return res.json({
            message: 'Inventory has been deleted'
        });
    }
}