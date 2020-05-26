// UserController.ts
// 
// Author       Dikry Alfiannur Wahyu
// Email        dalfiannur@gmail.com
// Github       https://github.com/dalfiannur
// Created At   5/24/20

import {NextFunction, Request, Response} from "express";
import {FindAll} from "../Requests/UserRequest";
import {getRepository, Repository} from "typeorm";
import {User} from "../Entities/User";

export class UserController {
    private readonly repository: Repository<User> = getRepository(User);

    public async findAll(req: FindAll, res: Response, next: NextFunction) {
        const page = req.query.page || 1;
        const limit = req.query.limit || 15;
        const skip = parseFloat(<string>page) - 1;
        const take = parseFloat(<string>limit);

        const [users, total] = await this.repository
            .findAndCount({ skip, take })
            .catch((error: Error) => {
                throw next(error);
            });

        const pages = Math.ceil(total / take);

        return res.json({
            message: 'Successfully',
            data: {total, pages, users}
        });
    }

    public async findById(req: Request, res: Response, next: NextFunction) {
        const id = +req.params.id;
        const user = await this.repository.findOne(id);

        if (!user) throw next(new Error('User not found'));

        return res.json({
            message: 'User found',
            data: user
        });
    }

    public async create(req: Request, res: Response, next: NextFunction) {
        const user = this.repository.create(req.body);

        await this.repository.insert(user)
            .catch((error: Error) => {
                throw next(error);
            });

        return res.json({
            message: 'User has been created.',
            data: user
        });
    }

    public async updateById(req: Request, res: Response, next: NextFunction) {
        const id = +req.params.id;
        const user = await this.repository.findOne(id);

        if (!user) throw next(new Error('User not found'));

        const prevData = user;

        user.name = req.body.name || user.name;
        user.username = req.body.username || user.username;
        user.password = req.body.password || user.password;

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