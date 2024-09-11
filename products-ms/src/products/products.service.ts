import { HttpStatus, Injectable, Logger } from '@nestjs/common';

import { PrismaService } from 'src/db/db';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger('Product Service');

  constructor(private readonly prismaService: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    return await this.prismaService.product.create({
      data: createProductDto,
    });
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit, page } = paginationDto;
    const totalPages = await this.prismaService.product.count({
      where: { available: true },
    });
    const lastPage = Math.ceil(totalPages / limit);
    return {
      data: await this.prismaService.product.findMany({
        skip: (page - 1) * limit,
        take: limit,
        where: { available: true },
      }),
      meta: {
        totalPages,
        page,
        lastPage,
      },
    };
  }

  async findOne(id: number) {
    const product = await this.prismaService.product.findUnique({
      where: { id, available: true },
    });
    if (!product)
      throw new RpcException({
        status: HttpStatus.NOT_FOUND,
        message: `Product whit id ${id}`,
      });
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id: ___, ...data } = updateProductDto;

    await this.findOne(id);

    return this.prismaService.product.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    const product = await this.prismaService.product.update({
      where: { id },
      data: {
        available: false,
      },
    });
    return product;
  }

  async validatePrducts(ids: number[]) {
    ids: Array.from(new Set(ids));

    const products = await this.prismaService.product.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    if (products.length !== ids.length) {
      throw new RpcException({
        message: 'Some products were not found',
      });
    }

    return products;
  }
}
