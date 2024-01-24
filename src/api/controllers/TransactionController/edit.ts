import { Response } from "express"
import { MapErrors } from "../../../configs/errors/MapErrors";
import { CreateTransactionModel } from "../../models/TransactionModel";
import { AccountRepository } from "../../repositories/AccountRepository";
import { UserAuthRequest } from "../../../configs/requests/UserAuthRequest";
import { CostCenterRepository } from "../../repositories/CostCenterRepository";
import { TransactionRepository } from "../../repositories/TransactionRepository";

export const edit = MapErrors(async (request: UserAuthRequest, response: Response) => {
  // #swagger.tags = ['Transação']
  // #swagger.summary = 'Editar transação'

  const transactionData: CreateTransactionModel = request.body
  const id = request.params.id

  const costCenter = transactionData.costCenterId ? (await CostCenterRepository.getById(transactionData.costCenterId)).id : null;
  const account = await AccountRepository.getById(transactionData.accountId);

  const data = await TransactionRepository.update(parseInt(id), {
    ...transactionData,
    costCenterId: costCenter,
    accountId: account.id
  });

  return response.json(data);
});