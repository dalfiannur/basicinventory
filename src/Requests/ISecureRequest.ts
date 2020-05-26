// ISecureRequest.ts
// 
// Author       Dikry Alfiannur Wahyu
// Email        dalfiannur@gmail.com
// Github       https://github.com/dalfiannur
// Created At   5/27/20

import {Request} from 'express';
import {User} from "../Entities/User";

export interface ISecureRequest extends Request {
    user: User
}