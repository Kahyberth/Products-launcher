import { IsEnum, IsOptional } from 'class-validator';
import { orderList, OrderStatus } from 'src/enums/orderstatus';

export class StatusDto {
  @IsOptional()
  @IsEnum(orderList, {
    message: `Valid Status are ${orderList}`,
  })
  status: OrderStatus;
}
