// AuthRequest.ts
// 
// Author       Dikry Alfiannur Wahyu
// Email        dalfiannur@gmail.com
// Github       https://github.com/dalfiannur
// Created At   5/27/20

import {Request} from 'express';

export interface ILoginRequest extends Request {
    body: {
        username: string,
        password: string
    }
}