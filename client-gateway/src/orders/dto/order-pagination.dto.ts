import { IsEnum, IsOptional } from 'class-validator';
import { orderList, OrderStatus } from 'src/enums/orderstatus';
import { PaginationDto } from 'src/common/dto/pagination.dto';

export class OrderPaginationDto extends PaginationDto {
  @IsEnum(orderList, {
    message: `Possible status values are ${orderList}`,
  })
  @IsOptional()
  status: OrderStatus;
}
