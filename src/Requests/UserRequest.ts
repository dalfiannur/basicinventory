// UserRequest.ts
// 
// Author       Dikry Alfiannur Wahyu
// Email        dalfiannur@gmail.com
// Github       https://github.com/dalfiannur
// Created At   5/24/20

import {ISecureRequest} from "./SecureRequest";
import {PaginationRequest} from "./PaginationRequest";

export interface IFindAllUsers extends ISecureRequest, PaginationRequest {

}

export interface ICreateUser extends ISecureRequest {
    body: {
        name: string,
        username: string,
        password: string
    }
}

export interface IUpdateUser extends ISecureRequest {
    body: {
        name: string
    },
    params: {
        id: string
    }
}