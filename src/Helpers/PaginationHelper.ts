// PaginationHelper.ts
// 
// Author       Dikry Alfiannur Wahyu
// Email        dalfiannur@gmail.com
// Github       https://github.com/dalfiannur
// Created At   5/27/20

import {IPaginationRequest} from "../Requests/IPaginationRequest";

export const ParsePaginationRequest = (req: IPaginationRequest) => ({
    page: req.page || 1,
    take: req.limit || 15,
    skip: (req.page ? req.page - 1 : 0) * (req.limit || 15)
});