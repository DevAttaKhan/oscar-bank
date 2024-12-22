import { Expose, Transform } from 'class-transformer';

export class EmployeeDto {
  @Expose()
  id: number;

  @Expose()
  @Expose()
  employmentStatus: string;

  @Expose()
  employmentType: string;

  @Expose()
  employeeCode: string;

  @Expose()
  performanceRating: string | null;

  @Expose()
  dateOfJoining: Date;

  @Expose()
  salary: number;

  @Expose()
  bonus: number;

  @Expose()
  createdAt: Date;

  @Transform(({ obj }) => obj.user?.id)
  @Expose()
  userId: number;

  @Transform(({ obj }) => obj.user?.email)
  @Expose()
  email: string;

  @Transform(({ obj }) => obj.user?.phone)
  @Expose()
  phone: string;

  @Transform(({ obj }) => obj.user?.firstName)
  @Expose()
  firstName: string;

  @Transform(({ obj }) => obj.user?.lastName)
  @Expose()
  lastName: string;

  @Transform(({ obj }) => obj.user?.userType)
  @Expose()
  userType: string;
}
