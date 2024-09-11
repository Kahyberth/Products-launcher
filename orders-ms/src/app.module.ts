import { Module } from '@nestjs/common';
import { OrdersModule } from './orders/orders.module';
import { PrismaService } from './prisma-service/prisma-service.service';

@Module({
  imports: [OrdersModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
