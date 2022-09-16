export class BaseException extends Error {
  constructor(
    public readonly statusCode: number,
    public readonly messages: string,
    public readonly errors?: string | string[]
  ) {
    super(messages);
    Error.captureStackTrace(this, this.constructor);
  }
}
