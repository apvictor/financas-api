import { Response } from "express"
import { MapErrors } from "../../../configs/errors/MapErrors";
import { UserAuthRequest } from "../../../configs/requests/UserAuthRequest";
import { TransactionRepository } from "../../repositories/TransactionRepository";

export const destroy = MapErrors(async (request: UserAuthRequest, response: Response) => {
  // #swagger.tags = ['Transação']
  // #swagger.summary = 'Deletar transação'

  const id = request.params.id

  const data = await TransactionRepository.delete(parseInt(id));

  return response.json(data);
});
