import { BaseError, ErrorInfo } from './base-error';

export class EntityNotFoundError extends BaseError {}

export class ValidationError extends BaseError {}

export class BadRequestError extends BaseError {}

export class DuplicateEntityError extends BaseError {}

export class ForbiddenError extends BaseError {}

export class ConflictError extends BaseError {}

export class ExternalServiceError extends BaseError {}

export class MissingValueError extends ValidationError {
  constructor(readonly variableName: string, errorInfo?: ErrorInfo) {
    super(`Variable '${variableName}' is missing`, errorInfo);
  }
}

export class InvalidValueError extends ValidationError {
  constructor(
    readonly variableName: string,
    readonly variableValue: unknown,
    readonly reason?: string,
    readonly relatedFields?: Record<string, any>,
    errorInfo?: ErrorInfo,
  ) {
    super(
      `${variableName} is invalid${
        variableValue
          ? ` (value: '${variableValue == null ? `/${variableValue}/` : variableValue}')`
          : ''
      }${reason ? `, reason: ${reason}` : ''}`,
      errorInfo,
    );
  }
}
