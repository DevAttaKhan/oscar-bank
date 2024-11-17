import { IsString, IsNotEmpty, ArrayNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateGroupDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @ArrayNotEmpty()
  @IsNumber({}, { each: true })
  permissions: number[];
}
