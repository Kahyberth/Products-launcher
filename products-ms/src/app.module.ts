import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { PrismaService } from './db/db';

@Module({
  imports: [ProductsModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
