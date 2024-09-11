import { IsEnum, IsOptional } from 'class-validator';
import { OrderStatusList } from 'src/config/orderstatus';
import { OrderStatus } from '@prisma/client';
import { PaginationDto } from './';

export class OrderPaginationDto extends PaginationDto {
  @IsEnum(OrderStatusList, {
    message: `Possible status values are ${OrderStatusList}`,
  })
  @IsOptional()
  status: OrderStatus;
}
