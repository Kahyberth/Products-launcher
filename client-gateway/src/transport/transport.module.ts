import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SERVICE } from 'src/enums/services';
import { envs } from 'src/envs/envs';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: SERVICE.NATS_SERVICE,
        transport: Transport.NATS,
        options: {
          servers: envs.NATS_SERVERS,
        },
      },
    ]),
  ],
  exports: [
    ClientsModule.register([
      {
        name: SERVICE.NATS_SERVICE,
        transport: Transport.NATS,
        options: {
          servers: envs.NATS_SERVERS,
        },
      },
    ]),
  ],
})
export class TransportModule {}
