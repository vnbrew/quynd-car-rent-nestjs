export enum BadRequestCode {
  BA_NOT_EXIST = 'BA-001',
  BA_IN_CORRECT_DATA_TYPE = 'BA-002',
  BA_INVALID_PASSWORD = 'BA-003',
  BA_PERMISSION = 'BA-004',
  BA_UNIQUE_FILED = 'BA-005',
}

export enum InternalServerErrorCode {
  IN_COMMON_ERROR = 'IN-001', //Common error
}

export enum UnauthorizedCode {
  UN_HEADER_WITH_OUT_TOKEN = 'UN-001', //Header without Token
  UN_TOKEN_IN_VALID = 'UN-002', //Token invalid
}
