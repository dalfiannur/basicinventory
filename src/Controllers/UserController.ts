// UserController.ts
// 
// Author       Dikry Alfiannur Wahyu
// Email        dalfiannur@gmail.com
// Github       https://github.com/dalfiannur
// Created At   5/24/20

import {NextFunction, Request, Response} from "express";
import {IFindAllUsers, ICreateUser, IUpdateUser} from "../Requests/UserRequest";
import {getRepository, Repository} from "typeorm";
import {User} from "../Entities/User";
import {ParsePaginationRequest} from "../Helpers/PaginationHelper";
import {genSaltSync, hashSync} from 'bcrypt';

export class UserController {
    private repository: Repository<User> = getRepository(User);

    public findAll = async (req: IFindAllUsers, res: Response, next: NextFunction) => {
        const { take, skip } = ParsePaginationRequest(req);

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

    public findById = async (req: Request, res: Response, next: NextFunction) => {
        const id = +req.params.id;
        const user = await this.repository.findOne(id);

        if (!user) throw next(new Error('User not found'));

        return res.json({
            message: 'User found',
            data: user
        });
    }

    public create = async (req: ICreateUser, res: Response, next: NextFunction) => {
        req.body.password = hashSync(req.body.password, genSaltSync());

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

    public updateById = async (req: IUpdateUser, res: Response, next: NextFunction) => {
        const id = +req.params.id;
        const user = await this.repository.findOne(id);

        if (!user) throw next(new Error('User not found'));

        const prevData = user;

        user.name = req.body.name || user.name;

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

    public deleteById = async (req: Request, res: Response, next: NextFunction) => {
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