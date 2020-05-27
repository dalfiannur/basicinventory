// ErrorMiddleware.ts
// 
// Author       Dikry Alfiannur Wahyu
// Email        dalfiannur@gmail.com
// Github       https://github.com/dalfiannur
// Created At   5/27/20

import {NextFunction, Request, Response} from "express";

export const ErrorMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);

    let status = 500;

    if (err.message.toLowerCase().includes('not found')) status = 404;

    res.status(status).json({
        message: err.message
    });
}