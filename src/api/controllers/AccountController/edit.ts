import { Response } from "express"
import { MapErrors } from "../../../configs/errors/MapErrors";
import { UpdateAccountModel } from "../../models/AccountModel";
import { AccountRepository } from "../../repositories/AccountRepository";
import { UserAuthRequest } from "../../../configs/requests/UserAuthRequest";

export const edit = MapErrors(async (request: UserAuthRequest, response: Response) => {
  /*
    #swagger.tags = ['Conta']
    #swagger.summary = 'Editar conta'

    #swagger.security = [{"apiKeyAuth": []}]

    #swagger.parameters['id'] = {
      in: 'path',
      required: true,
      type: 'integer'
    }

    #swagger.parameters['body'] = {
      in: 'body',
      required: true,
      schema: {
        name: "Nubank",
      }
    }
  */

  const id = request.params.id

  const accountData: UpdateAccountModel = request.body;

  const data = await AccountRepository.update(parseInt(id), { ...accountData });

  return response.json(data);
});


