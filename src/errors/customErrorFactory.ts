export class CustomAPIError extends Error {
  statusCode: number;
  constructor(msg: string, statusCode: number) {
    super(msg);
    this.statusCode = statusCode;
  }
}

export const createCustomAPIError = (msg: string, statusCode: number) =>
  new CustomAPIError(msg, statusCode);
