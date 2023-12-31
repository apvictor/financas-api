import { object, string, number } from 'yup';

const TransactionTypeEnum = {
  INCOME: "INCOME",
  EXPENSE: "EXPENSE"
}
export const TransactionValidation = {
  create: object({
    body: object({
      name: string().required(),
      value: number().required(),
      accountId: number().required(),
      costCenterId: number().optional(),
      transactionType: string().oneOf(Object.values(TransactionTypeEnum)).required(),
    }),
  }),
}
