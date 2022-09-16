import { BaseException } from "./base.exception";

export class BadRequestException extends BaseException {
  constructor(
    public readonly statusCode: number,
    public readonly errors?: string | string[]
  ) {
    super(statusCode, "Bad Request", errors);
    Error.captureStackTrace(this, this.constructor);
  }
}
