import { BranchStatus } from '@/common/constants/common.enum';
import { IsString, IsNotEmpty, IsInt, IsOptional, Length, Matches, IsEmail, IsEnum } from 'class-validator';

export class CreateBranchDto {
  @IsString()
  @IsNotEmpty({ message: 'Branch name is required' })
  @Length(1, 255)
  name: string;

  @IsString()
  @Matches(/^\d+$/, { message: 'Branch code must be an integer' })
  code: string;

  @IsString()
  @IsNotEmpty({ message: 'City is required' })
  city: string;

  @IsString()
  @IsNotEmpty({ message: 'State is required' })
  state: string;

  @IsString()
  @IsNotEmpty({ message: 'Country is required' })
  country: string;

  @IsString()
  @Matches(/^\d+$/, { message: 'Postal code must be an integer' })
  postalCode: string;

  @IsString()
  @Matches(/^[0-9]{10,15}$/, { message: 'Phone number should be between 10 to 15 digits' })
  phone: string;

  @IsEmail({}, { message: 'Invalid email address' })
  email: string;

  @IsOptional()
  @IsInt()
  managerId?: number;

  @IsEnum(BranchStatus)
  status: BranchStatus;
}
