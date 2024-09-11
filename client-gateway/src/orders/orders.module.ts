import { Module } from '@nestjs/common';

import { OrdersController } from './orders.controller';
import { TransportModule } from 'src/transport/transport.module';

@Module({
  controllers: [OrdersController],
  providers: [],
  imports: [TransportModule],
})
export class OrdersModule {}
