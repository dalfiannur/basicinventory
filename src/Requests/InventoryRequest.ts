// InventoryRequest.ts
// 
// Author       Dikry Alfiannur Wahyu
// Email        dalfiannur@gmail.com
// Github       https://github.com/dalfiannur
// Created At   5/27/20

import {ISecureRequest} from "./SecureRequest";
import {PaginationRequest} from "./PaginationRequest";

export interface IFindAllInventories extends ISecureRequest, PaginationRequest {

}

export interface ICreateInventory extends ISecureRequest {
    body: {
        isOut: boolean,
        quantity: number,
        createdByUserId: number
    };
}

export interface IUpdateInventory extends ISecureRequest {
    body: {
        isOut: boolean,
        quantity: number,
        updatedByUserId: number
    }
}