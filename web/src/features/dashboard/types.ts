export type Transaction = {
    userId: {
        username: string,
        email: string,
    },
    paymentAmount: number | string,
    transactionType: string,
    paymentType: string,
    createdAt: string,
    updatedAt: string,
}