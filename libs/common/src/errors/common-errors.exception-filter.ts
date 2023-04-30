import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { EnvironmentEnum } from '../enums';

const errorCode = (code: number) => {
  switch (code) {
    case 400:
      return 'Bad Request';
    case 401:
      return 'Unouthorized';
    case 403:
      return 'Not Allowed';
    case 404:
      return 'Not Found';
    case 405:
      return 'Method Not Allowed';
    case 409:
      return 'Conflict';
    case 422:
      return 'Unprocessable Entity';
    default:
      return 'Other Error';
  }
};

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const stack = process.env.NODE_ENV !== EnvironmentEnum.PRODUCTION ? exception.stack : undefined;

    const status =
      exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    const resVal = exception?.getResponse ? exception.getResponse() : false;

    if (!resVal) {
      const errArray: string[] = [];
      const err =
        exception?.message || exception?.msg
          ? exception?.message
          : exception?.msg || 'Unknown error occured';
      errArray.push(err);

      return response.status(status).json({
        statusCode: status,
        message: errArray,
        error: 'Unknown Error',
        stack,
      });
    }

    let { message } = resVal;

    if (!message && typeof resVal === 'string') message = resVal;

    const formatMessageArray: string[] = [];

    formatMessageArray.push(message);

    const msg: string[] = typeof message === 'string' ? formatMessageArray : message;

    response.status(status || 500).json({
      statusCode: status || 500,
      messages: msg,
      error: errorCode(status || 500),
      stack,
    });
  }
}
