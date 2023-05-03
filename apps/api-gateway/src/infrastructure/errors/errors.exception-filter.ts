import { EnvironmentEnum } from '@app/common';
import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';

const errorCode = (code: number) => {
  switch (code) {
    case 400:
      return 'Bad Request';
    case 401:
      return 'Unauthorized';
    case 403:
      return 'Forbidden';
    case 404:
      return 'Not Found';
    case 405:
      return 'Method Not Allowed';
    case 409:
      return 'Conflict';
    case 422:
      return 'Unprocessable Entity';
    case 500:
      return 'Internal Server Error';
    default:
      return 'Other Error';
  }
};

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(error: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const isProduction = process.env.NODE_ENV === EnvironmentEnum.PRODUCTION;

    if (error instanceof HttpException) {
      const status = error.getStatus();
      const exceptionResponse: any = error.getResponse();

      const stack = error.stack;

      response.status(status).json({
        statusCode: status,
        message: Array.isArray(exceptionResponse.message)
          ? exceptionResponse.message
          : [exceptionResponse.message],
        error: errorCode(status),
        stack: !isProduction && stack,
      });
    } else {
      const { statusCode, message, stack, ...other } = error;
      const status = statusCode || HttpStatus.INTERNAL_SERVER_ERROR;
      const messageResponse = error.message || 'Internal server error';
      const errorResponse = {
        statusCode: status,
        message: Array.isArray(messageResponse) ? messageResponse : [messageResponse],
        error: errorCode(status),
        stack,
        ...other,
      };

      response.status(status).json(errorResponse);
    }
  }
}
