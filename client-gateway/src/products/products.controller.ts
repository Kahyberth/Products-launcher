import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { SERVICE } from 'src/enums/services';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject(SERVICE.NATS_SERVICE)
    private readonly client: ClientProxy,
  ) {}

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.client.send({ cmd: 'find_one_product' }, { id }).pipe(
      catchError((err) => {
        console.log(err);
        throw new RpcException(err);
      }),
    );
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.client.send({ cmd: 'find_all_products' }, paginationDto);
  }

  @Post()
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.client.send({ cmd: 'create_product' }, createProductDto);
  }

  @Delete(':id')
  deleteProduct(@Param('id', ParseIntPipe) id: number) {
    return this.client.send({ cmd: 'delete_product' }, { id }).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  @Patch(':id')
  updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProuctDto: UpdateProductDto,
  ) {
    return this.client.send(
      { cmd: 'update_product' },
      { id, ...updateProuctDto },
    );
  }
}
