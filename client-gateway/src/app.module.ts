import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { TransportModule } from './transport/transport.module';

@Module({
  imports: [ProductsModule, OrdersModule, TransportModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
