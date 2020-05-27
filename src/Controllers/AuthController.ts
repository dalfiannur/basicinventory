// AuthController.ts
// 
// Author       Dikry Alfiannur Wahyu
// Email        dalfiannur@gmail.com
// Github       https://github.com/dalfiannur
// Created At   5/27/20

import {NextFunction, Response} from "express";
import {getRepository, Repository} from "typeorm";
import {User} from "../Entities/User";
import {compareSync} from "bcrypt";
import {sign} from "jsonwebtoken";
import config from 'config';
import { ILoginRequest } from "../Requests/AuthRequest";

export class AuthController {
    private readonly repository: Repository<User> = getRepository(User);

    public login = async (req: ILoginRequest, res: Response, next: NextFunction) => {
        const user = await this.repository
            .findOne({
                where: {
                    username: req.body.username
                }
            })
            .catch((error: Error) => {
                throw next(error);
            });

        if (!user) throw next(new Error("Invalid Credentials"));

        const isValid = compareSync(req.body.password, user.password);
        if (!isValid) throw next(new Error("Invalid Credentials"));

        const secret: string = config.get('JWT.secret') || 'qisk';
        const token = sign({user}, secret);

        return res.json({
            message: 'Login successfully',
            data: {
                tokenType: 'Bearer',
                accessToken: token
            }
        })
    }
}