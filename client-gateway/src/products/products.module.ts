import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { TransportModule } from 'src/transport/transport.module';

@Module({
  controllers: [ProductsController],
  providers: [],
  imports: [TransportModule],
})
export class ProductsModule {}
