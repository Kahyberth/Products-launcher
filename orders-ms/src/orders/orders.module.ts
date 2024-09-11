import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { PrismaService } from 'src/prisma-service/prisma-service.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs } from 'src/config/envs';
import { SERVICE } from 'src/common/enums/services';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService, PrismaService],
  imports: [
    ClientsModule.register([
      {
        transport: Transport.NATS,
        name: SERVICE.NATS_SERVICE,
        options: {
          servers: envs.NATS_SERVERS,
        },
      },
    ]),
  ],
})
export class OrdersModule {}
