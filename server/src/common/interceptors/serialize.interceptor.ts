import { CallHandler, ExecutionContext, NestInterceptor, UseInterceptors } from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { plainToInstance } from 'class-transformer';
import { createPaginatedDto } from '../util/pagination.util';

interface ClassConstructor {
  new (...args: any[]): {};
}

export const Serialize = (dto: ClassConstructor) => {
  return UseInterceptors(new SerializeInterceptor(dto));
};

export const SerializePagination = (dto: ClassConstructor) => Serialize(createPaginatedDto(dto));

class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: any) {}

  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((data: any) => {
        console.log(data);
        return plainToInstance(this.dto, data, {
          enableImplicitConversion: true,
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}
