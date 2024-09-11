import { Type } from 'class-transformer';
import { IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  public name: string;
  @IsPositive()
  @IsNumber({
    maxDecimalPlaces: 4,
  })
  @Type(() => Number)
  public price: number;
}
