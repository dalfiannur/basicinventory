// PaginationHelper.ts
// 
// Author       Dikry Alfiannur Wahyu
// Email        dalfiannur@gmail.com
// Github       https://github.com/dalfiannur
// Created At   5/27/20

interface PaginationRequest {
    page?: number;
    limit?: number;
}

export const ParsePaginationRequest = (req: PaginationRequest) => ({
    take: req.limit || 15,
    skip: (req.page ? req.page - 1 : 0) * (req.limit || 15)
});