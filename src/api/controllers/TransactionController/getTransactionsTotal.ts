import { Response } from "express"
import { MapErrors } from "../../../configs/errors/MapErrors";
import { UserAuthRequest } from "../../../configs/requests/UserAuthRequest";
import { TransactionRepository } from "../../repositories/TransactionRepository";

export const getTransactionsTotal = MapErrors(async (request: UserAuthRequest, response: Response) => {
  /*
    #swagger.tags = ['Transação']
    #swagger.summary = 'Listar total da entrada e saída'

    #swagger.security = [{"apiKeyAuth": []}]

    #swagger.responses[200] = {
      schema: {
        expense: 0,
        income: 0
      }
    }
  */

  const user = request.userAuth;

  const totalExpense = await TransactionRepository.getTotal(user.id, "EXPENSE");
  const totalIncome = await TransactionRepository.getTotal(user.id, "INCOME");

  return response.json({ expense: totalExpense, income: totalIncome });
});
