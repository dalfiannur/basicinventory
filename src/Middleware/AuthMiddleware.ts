// AuthMiddleware.ts
// 
// Author       Dikry Alfiannur Wahyu
// Email        dalfiannur@gmail.com
// Github       https://github.com/dalfiannur
// Created At   5/27/20

import {Response, Request, NextFunction} from "express";
import { verify } from 'jsonwebtoken';
import config from 'config';
import {User} from "../Entities/User";

export const AuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authorization = req.headers.authorization;

    if (!authorization) return res.status(401).json({
        message: 'Unauthenticated'
    });

    const tokenString = authorization.replace('Bearer ', '');
    const secret: string = config.get('JWT.secret') || 'qisk';
    type ParsedToken = {
        user: User
    }
    const parsedToken: ParsedToken = <ParsedToken>verify(tokenString, secret);

    // @ts-ignore
    req.user = parsedToken.user;
    next()
}