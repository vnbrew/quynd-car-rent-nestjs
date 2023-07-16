export enum BadRequestCode {
  BA_EMAIL_DOES_NOT_EXIST = "BA-001", //Email does not exist
  BA_IN_CORRECT_DATA_TYPE = "BA-002", //Incorrect data type
  BA_INVALID_PASSWORD = "BA-003", //Password wrong
  BA_PERMISSION = "BA-004", //Do not have permission
  BA_EMAIL_MUST_BE_UNIQUE = "BA-005", //Email must be unique
  BA_USER_DOES_NOT_EXIST = "BA-006", //User does not exist
  BA_CAR_DOES_NOT_EXIST = "BA-007", //Car does not exist
}

export enum InternalServerErrorCode {
  IN_COMMON_ERROR = "IN-001" //Common error
}

export enum UnauthorizedCode {
  UN_HEADER_WITH_OUT_TOKEN = "UN-001", //Header without Token
  UN_TOKEN_OF_USER_LOGOUT = "UN-002", //Token of user logout
  UN_TOKEN_IN_VALID = "UN-003", //Token invalid
  UN_TOKEN_REMOVED = "UN-004", //Token has been removed
}
