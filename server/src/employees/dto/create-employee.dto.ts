import {
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsDate,
  IsBoolean,
  Min,
  Max,
  Length,
  Matches,
} from 'class-validator';
import {
  UserStatus,
  UserType,
  EmploymentStatus,
  EmploymentType,
  PerformanceRating,
} from '@/common/constants/common.enum';
import { Type } from 'class-transformer';

export class CreateEmployeeDto {
  @IsNotEmpty()
  @IsString()
  @Length(2, 50)
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @Length(2, 50)
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(11, 15)
  phone: string;

  @IsOptional()
  @IsString()
  @Length(5, 255)
  address?: string;

  @IsOptional()
  @IsString()
  @Length(13, 20)
  cnic?: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  dateOfBirth?: Date;

  @IsOptional()
  @IsEnum(UserStatus, { message: 'Status must be one of Active, Inactive, or Suspended' })
  status?: UserStatus;

  @IsOptional()
  @IsEnum(UserType, { message: 'UserType must be ADMIN, EMPLOYEE, or CUSTOMER' })
  userType?: UserType.EMPLOYEE;

  @IsOptional()
  @IsBoolean()
  isEmailVerified?: true;

  @IsOptional()
  @IsBoolean()
  isPhoneVerified?: true;

  // Employee-specific fields
  @IsNotEmpty()
  @IsString()
  @Length(5, 20)
  employeeCode: string;

  @IsOptional()
  @IsEnum(EmploymentStatus, { message: 'EmploymentStatus must be ACTIVE, INACTIVE, or TERMINATED' })
  employmentStatus?: EmploymentStatus;

  @IsOptional()
  @IsEnum(EmploymentType, { message: 'EmploymentType must be FULL_TIME, PART_TIME, or CONTRACT' })
  employmentType?: EmploymentType;

  @IsOptional()
  @IsEnum(PerformanceRating, {
    message: 'PerformanceRating must be EXCELLENT, GOOD, AVERAGE, or BELOW_AVERAGE',
  })
  performanceRating?: PerformanceRating;

  @IsOptional()
  @IsInt()
  supervisorId?: number;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  dateOfJoining?: Date;

  @IsOptional()
  @IsInt()
  @Min(0)
  salary?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  bonus?: number;

  @IsNotEmpty()
  @IsInt()
  designationId: number;

  @IsOptional()
  @IsInt()
  assignedBranchId?: number;

  @IsOptional()
  @IsInt()
  @Min(18)
  @Max(65)
  age?: number;

  @IsOptional()
  @IsString()
  department?: string;

  @IsOptional()
  @IsInt()
  failedLoginAttempts?: number;

  @IsOptional()
  @IsDate()
  lockedUntil?: Date;

  @IsOptional()
  @IsString()
  preferredLanguage?: string;

  @IsOptional()
  @IsString()
  timezone?: string;
}
