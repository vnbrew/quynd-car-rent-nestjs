import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMemberDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  
  @IsString()
  @IsNotEmpty()
  gender: string;
}
