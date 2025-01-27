export interface IOptionsObject {
  LOOKUP_DELIMITER?: string;
  RELATION_DELIMITER?: string;
  EXACT?: string;
  NOT?: string;
  CONTAINS?: string;
  IS_NULL?: string;
  GT?: string;
  GTE?: string;
  LT?: string;
  LTE?: string;
  STARTS_WITH?: string;
  ENDS_WITH?: string;
  IN?: string;
  BETWEEN?: string;
  CONDITION_DELIMITER?: string;
  VALUE_DELIMITER?: string;
  DEFAULT_LIMIT?: string;
}

export interface IQueryObject {
  select?: string;
  join?: string;
  sort?: string;
  cache?: string;
  limit?: string;
  page?: string;
  filter?: string;
}

export interface ILooseObject {
  [key: string]: any;
}
