import { PrismaClient } from "@prisma/client";
import {
  IOptionsObject,
  IQueryObject,
} from "./interfaces/database-query-params";
import { parseFilters, parseJoin, parseSelect, parseSort } from "./utils/query-params-transpiler";

export class BaseRepository<T> {
  protected prisma: PrismaClient;
  protected model: any;

  constructor(model: any, prisma: PrismaClient) {
    this.model = model;
    this.prisma = prisma;
  }

  async findPaginated(queryObject: IQueryObject, options: IOptionsObject = {}) {
    const {
      filter,
      sort,
      limit = options.DEFAULT_LIMIT || "10",
      page = "1",
      select,
      join,
    } = queryObject;

    const where = parseFilters(filter, options);
    const orderBy = parseSort(sort);
    const take = parseInt(limit, 10);
    const skip = (parseInt(page, 10) - 1) * take;
    const selectFields = parseSelect(select);
    const includeRelations = parseJoin(join);

    const [data, total] = await Promise.all([
      this.model.findMany({
        where, orderBy, skip, take, select: selectFields,
        include: includeRelations,
      }),
      this.model.count({ where }),
    ]);

    return {
      data,
      total,
      currentPage: parseInt(page, 10),
      pageSize: take,
      totalPages: Math.ceil(total / take),
    };
  }

  async findById(id: number) {
    return this.model.findUnique({ where: { id } });
  }

  async create(data: T) {
    return this.model.create({ data });
  }

  async update(id: number, data: Partial<T>) {
    return this.model.update({
      where: { id },
      data,
    });
  }

  async delete(id: number) {
    return this.model.delete({
      where: { id },
    });
  }

  async count(where: any = {}) {
    return this.model.count({ where });
  }
}
