// Server.ts
// 
// Author       Dikry Alfiannur Wahyu
// Email        dalfiannur@gmail.com
// Github       https://github.com/dalfiannur
// Created At   5/24/20

import 'reflect-metadata';
import Express from 'express';
import {Application, json, urlencoded} from 'express';
import {Routes} from "./Routes";
import {createConnection} from 'typeorm';
import {ErrorMiddleware} from "./Middleware/ErrorMiddleware";
import cors from 'cors';

export class Server {
    private app: Application;

    constructor() {
        this.app = Express();

        // Setting up database
        createConnection()
            .then(() => {
                this.setupRouter();
            })
            .catch((error: Error) => {
                throw error;
            });
    }

    private setupRouter() {
        const routes = new Routes('v1');
        this.app.use(json());
        this.app.use(urlencoded({ extended: true }));
	this.app.use(cors());
        this.app.use(routes.all());
        this.app.use(ErrorMiddleware);
    }

    public start(port: number = 8000) {
        this.app.listen(port, () => {
            console.info('server started at port %s', port);
        })
    }
}