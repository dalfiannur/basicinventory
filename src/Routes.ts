// Routes.ts
// 
// Author       Dikry Alfiannur Wahyu
// Email        dalfiannur@gmail.com
// Github       https://github.com/dalfiannur
// Created At   5/24/20

import { Router} from "express";
import {UserController} from "./Controllers/UserController";
import {AuthMiddleware} from "./Middleware/AuthMiddleware";
import {AuthController} from "./Controllers/AuthController";
import {InventoryController} from "./Controllers/InventoryController";

export class Routes {
    private readonly router: Router = Router();
    private version: string;

    constructor(version: string = 'v1') {
        this.version = version;
    }

    private authRoutes(): void {
        const router = this.router;
        const controller = new AuthController();

        router.post('/auth/login', controller.login);
    }

    private userRoutes(): void {
        const router = this.router;
        const controller = new UserController();


        // @ts-ignore
        router.get('/users', AuthMiddleware, controller.findAll);
        router.get('/users/:id', AuthMiddleware, controller.findById);
        // @ts-ignore
        router.post('/users', AuthMiddleware, controller.create);
        // @ts-ignore
        router.put('/users/:id', AuthMiddleware, controller.updateById);
        router.delete('/users/:id', AuthMiddleware, controller.deleteById);
    }

    private inventoryRoutes(): void {
        const router = this.router;
        const controller = new InventoryController();

        // @ts-ignore
        router.get('/inventories', AuthMiddleware, controller.findAllInventories);
        router.get('/inventories/:id', AuthMiddleware, controller.findById);
        // @ts-ignore
        router.post('/inventories', AuthMiddleware, controller.create);
        // @ts-ignore
        router.put('/inventories/:id', AuthMiddleware, controller.updateById);
        router.delete('/inventories/:id', AuthMiddleware, controller.deleteById);

    }

    public all(): Router {
        this.authRoutes();
        this.userRoutes();
        this.inventoryRoutes();

        return this.router;
    }
}