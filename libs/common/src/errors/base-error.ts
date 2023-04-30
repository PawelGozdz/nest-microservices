export type ErrorInfo = {
  cause?: Error;
  [key: string]: unknown;
};

export class BaseError extends Error {
  constructor(message?: string, errorInfo?: ErrorInfo) {
    super(message);

    Object.assign(this, errorInfo);
    this.name = this.constructor.name;
  }

  public readonly cause?: Error;

  readonly [key: string]: unknown;
}
