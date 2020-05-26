// Server.ts
// 
// Author       Dikry Alfiannur Wahyu
// Email        dalfiannur@gmail.com
// Github       https://github.com/dalfiannur
// Created At   5/24/20

import Express from 'express';
import {Application} from 'express';
import {Routes} from "./Routes";
import {createConnection} from 'typeorm';

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
        this.app.use(routes.all());
    }

    public start(port: number = 8000) {
        this.app.listen(port, () => {
            console.info('server started at port %s', port);
        })
    }
}