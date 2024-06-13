import { IsNotEmpty, IsString } from "class-validator";

export class DefineItemDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}

