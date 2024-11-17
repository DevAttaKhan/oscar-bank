import { IsString, IsNotEmpty, ArrayNotEmpty, IsNumber } from 'class-validator';

export class CreateGroupDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @ArrayNotEmpty()
  @IsNumber({}, { each: true })
  permissions: number[];
}
