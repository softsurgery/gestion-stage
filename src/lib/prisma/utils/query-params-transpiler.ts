import {
  ILooseObject,
  IOptionsObject,
} from "../interfaces/database-query-params";

export function parseFilters(
  filter?: string,
  options: IOptionsObject = {}
): object {
  if (!filter) return {};

  const where: ILooseObject = {};
  let andConditions: ILooseObject[] = [];
  let orConditions: ILooseObject[] = [];

  // Function to parse a single condition like 'field||$eq||value'
  function parseCondition(condition: string): ILooseObject {
    const [field, operator, value] = condition.split(options.LOOKUP_DELIMITER || "||");
    const parsedValue = parseValue(value, operator);

    let conditionObj: ILooseObject = {};

    switch (operator) {
      case options.EXACT || "$eq":
        conditionObj[field] = parsedValue;
        break;
      case options.NOT || "!":
        conditionObj[field] = { not: parsedValue };
        break;
      case options.CONTAINS || "$cont":
        conditionObj[field] = { contains: parsedValue };
        break;
      case options.IS_NULL || "$isnull":
        conditionObj[field] = { is: null };
        break;
      case options.GT || "$gt":
        conditionObj[field] = { gt: parsedValue };
        break;
      case options.GTE || "$gte":
        conditionObj[field] = { gte: parsedValue };
        break;
      case options.LT || "$lt":
        conditionObj[field] = { lt: parsedValue };
        break;
      case options.LTE || "$lte":
        conditionObj[field] = { lte: parsedValue };
        break;
      case options.STARTS_WITH || "$starts":
        conditionObj[field] = { startsWith: parsedValue };
        break;
      case options.ENDS_WITH || "$ends":
        conditionObj[field] = { endsWith: parsedValue };
        break;
      case options.IN || "$in":
        conditionObj[field] = { in: parsedValue };
        break;
      case options.BETWEEN || "$between":
        const [start, end] = parsedValue.split(",");
        conditionObj[field] = { gte: start, lte: end };
        break;
      default:
        conditionObj[field] = parsedValue;
    }

    return conditionObj;
  }

  // Split the filter into tokens based on semicolons, but handle parentheses first
  const tokens = filter.split(";");

  let currentGroup: string[] = [];
  let insideParentheses = false;
  let tempGroup: string[] = [];

  tokens.forEach((token) => {
    if (token.startsWith("(")) {
      // Inside parentheses: Begin a new OR group
      insideParentheses = true;
      tempGroup.push(token.slice(1));  // Remove the opening '('
    } else if (token.endsWith(")")) {
      // Inside parentheses: Close the current OR group
      tempGroup.push(token.slice(0, -1));  // Remove the closing ')'
      orConditions.push(...tempGroup.map(parseCondition));
      insideParentheses = false;
      tempGroup = [];
    } else if (insideParentheses) {
      // Inside parentheses: Add conditions to the temp group
      tempGroup.push(token);
    } else {
      // Outside parentheses: Add to AND conditions
      andConditions.push(parseCondition(token));
    }
  });

  // Combine OR conditions (inside parentheses) and AND conditions (outside parentheses)
  if (orConditions.length > 0) {
    where.OR = orConditions;
  }

  if (andConditions.length > 0) {
    where.AND = andConditions;
  }
  console.log(where);
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


export function parseSelect(select?: string): object | undefined {
  if (!select) return undefined;

  const fields = select.split(",");
  const selectObject: ILooseObject = {};

  fields.forEach((field) => {
    selectObject[field.trim()] = true;
  });

  return selectObject;
}

export function parseJoin(join?: string): object | undefined {
  if (!join) return undefined;

  const relations = join.split(",");
  const includeObject: ILooseObject = {};

  relations.forEach((relation) => {
    const parts = relation.split(".");
    let currentLevel = includeObject;

    parts.forEach((part, index) => {
      if (!currentLevel[part]) {
        currentLevel[part] = index === parts.length - 1 ? true : {};
      }
      currentLevel = currentLevel[part] as ILooseObject;
    });
  });

  return includeObject;
}