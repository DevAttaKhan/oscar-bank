import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    // Check if headers have already been sent
    if (response.headersSent) {
      console.error('Response headers already sent. Skipping additional error handling.');
      return;
    }

    const status =
      exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    const message = exception?.response?.message || exception?.message || 'Internal server error';

    response.status(status).json({
      statusCode: status,
      message,
    });
  }
}
