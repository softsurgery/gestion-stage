import {
  ILooseObject,
  IOptionsObject,
} from "../interfaces/database-query-params";

export function parseFilters(
  filter?: string,
  options: IOptionsObject = {}
): object {
  if (!filter) return {};
  const filters = filter.split(options.CONDITION_DELIMITER || ";");
  const where: ILooseObject = {};

  filters.forEach((filterCondition) => {
    const [field, operator, value] = filterCondition.split(
      options.LOOKUP_DELIMITER || "||"
    );

    const parsedValue = parseValue(value, operator);

    switch (operator) {
      case options.EXACT || "$eq":
        where[field] = parsedValue;
        break;
      case options.NOT || "!":
        where[field] = { not: parsedValue };
        break;
      case options.CONTAINS || "$cont":
        where[field] = { contains: parsedValue };
        break;
      case options.IS_NULL || "$isnull":
        where[field] = { is: null };
        break;
      case options.GT || "$gt":
        where[field] = { gt: parsedValue };
        break;
      case options.GTE || "$gte":
        where[field] = { gte: parsedValue };
        break;
      case options.LT || "$lt":
        where[field] = { lt: parsedValue };
        break;
      case options.LTE || "$lte":
        where[field] = { lte: parsedValue };
        break;
      case options.STARTS_WITH || "$starts":
        where[field] = { startsWith: parsedValue };
        break;
      case options.ENDS_WITH || "$ends":
        where[field] = { endsWith: parsedValue };
        break;
      case options.IN || "$in":
        where[field] = { in: parsedValue.split(",") };
        break;
      case options.BETWEEN || "$between":
        const [start, end] = parsedValue.split(",");
        where[field] = { gte: start, lte: end };
        break;
      case options.OR || "$or":
        where[field] = {
          OR: parsedValue.split(",").map((v : any) => parseValue(v, operator)),
        };
        break;
      default:
        where[field] = parsedValue;
    }
  });
  return where;
}

export function parseSort(sort?: string): object | undefined {
  if (!sort) return undefined;
  const sortFields = sort.split(",");
  const orderBy: ILooseObject = {};

  sortFields.forEach((sortField) => {
    const [field, direction] = sortField.split(":");
    orderBy[field] = direction.toLowerCase() === "desc" ? "desc" : "asc";
  });

  return orderBy;
}

function inferType(value: string): any {
  if (!isNaN(Number(value))) {
    return Number(value);
  } else if (value === "true" || value === "false") {
    return value === "true";
  } else if (Date.parse(value)) {
    return new Date(value);
  }
  return value;
}
function parseValue(value: string, operator: string): any {
  if (operator === "$in" || operator === "$or") {
    return value.split(",").map((v) => inferType(v));
  } else if (operator === "$between") {
    return value;
  }
  return inferType(value);
}
