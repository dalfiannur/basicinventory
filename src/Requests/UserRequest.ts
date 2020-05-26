// UserRequest.ts
// 
// Author       Dikry Alfiannur Wahyu
// Email        dalfiannur@gmail.com
// Github       https://github.com/dalfiannur
// Created At   5/24/20

import { Request } from 'express';
import {ISecureRequest} from "./ISecureRequest";
import {IPaginationRequest} from "./IPaginationRequest";

export interface IFindAllUsers extends ISecureRequest, IPaginationRequest {

}