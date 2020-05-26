// IInventoryRequest.ts
// 
// Author       Dikry Alfiannur Wahyu
// Email        dalfiannur@gmail.com
// Github       https://github.com/dalfiannur
// Created At   5/27/20

import {ISecureRequest} from "./ISecureRequest";
import {IPaginationRequest} from "./IPaginationRequest";

export interface IFindAllInventories extends ISecureRequest, IPaginationRequest {

}

export interface ICreateInventory extends ISecureRequest {
    body: {
        isOut: boolean,
        quantity: number;
    };
}

export interface IUpdateInventory extends ICreateInventory {

}