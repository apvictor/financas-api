import { NotFoundError } from "../../configs/errors/ApiError";
import { PrismaService } from "../../shared/services/PrismaService";
import { CostCenterModel, CreateCostCenterModel, UpdateCostCenterModel } from './../models/CostCenterModel';

export const CostCenterRepository = {
  async delete(id: number) {
    const costCenter = await this.getById(id);

    const data = await PrismaService.costCenters.delete({
      where: { id: costCenter.id }
    });

    return data;
  },
  async update(id: number, costCenter: UpdateCostCenterModel) {
    const data = await PrismaService.costCenters.update({
      data: costCenter,
      where: { id }
    });

    return data;
  },
  async insert(costCenter: CreateCostCenterModel) {
    const data = await PrismaService.costCenters.create({ data: costCenter });

    return data;
  },
  async getTotalPercentage(userId: number) {
    const { _sum: { percentage } } = await PrismaService.costCenters.aggregate({
      _sum: { percentage: true },
      where: { userId }
    });

    return percentage ?? 0;
  },
  async getAll(userId: number, transactionType?: "EXPENSE" | "INCOME", month?: string) {
    let gte = new Date()
    let lte = new Date()

    if (month) {
      let [ano, mes] = month?.split("-");

      const date = new Date(Number(ano), Number(mes) - 1);
      gte = new Date(date.getFullYear(), date.getMonth(), 1);
      lte = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    }


    const data: CostCenterModel[] = await PrismaService.costCenters.findMany({
      include: {
        transactions: {
          where: {
            transactionType, createdAt: {
              gte,
              lte,
            }
          }
        }
      },
      where: { userId },
      orderBy:
        [
          { percentage: "desc" },
          { name: "asc" }
        ]

    });

    return data;
  },
  async getById(id: number) {
    const data = await PrismaService.costCenters.findUnique({
      where: { id },
    });

    if (!data) throw new NotFoundError();

    return data;
  },

}
