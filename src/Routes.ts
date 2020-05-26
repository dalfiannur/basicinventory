// Routes.ts
// 
// Author       Dikry Alfiannur Wahyu
// Email        dalfiannur@gmail.com
// Github       https://github.com/dalfiannur
// Created At   5/24/20

import { Router} from "express";
import {UserController} from "./Controllers/UserController";

export class Routes {
    private readonly router: Router = Router();
    private version: string;

    constructor(version: string = 'v1') {
        this.version = version;
    }

    private userRoutes(): void {
        const router = this.router;
        const controller = new UserController();

        router.get('/users', controller.findAll);
        router.get('/users/:id', controller.findById);
        router.post('/users', controller.create);
        router.put('/users/:id', controller.updateById);
        router.delete('/users/:id', controller.deleteById);
    }

    public all(): Router {
        this.userRoutes();

        return this.router;
    }
}