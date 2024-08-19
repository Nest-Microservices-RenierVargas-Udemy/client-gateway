import {
  BadRequestException,
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
import { PaginatinoDto } from 'src/common';
import { PRODUCT_SERVICE } from 'src/config';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject(PRODUCT_SERVICE) private readonly productClient: ClientProxy,
  ) {}

  @Post()
  createProdcut(@Body() createProductDto: CreateProductDto) {
    return this.productClient.send({ cmd: 'create_product' }, createProductDto);
  }

  @Get()
  findAllProducts(@Query() paginatinoDto: PaginatinoDto) {
    return this.productClient.send({ cmd: 'find_all' }, paginatinoDto);
    // return this.productClient.send({cmd: 'find_all'}, { limit : 2 , page:2 })
  }

  @Get(':id')
  async findOneProduct(@Param('id') id: string) {
    return this.productClient
      .send({ cmd: 'find_one_product' }, { id: id })
      .pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );

    // try {
    //   const product = await firstValueFrom(
    //     this.productClient.send({ cmd: 'find_one_product' }, { id: id }),
    //   );
    //   return product;
    // } catch (error) {
    //   throw new RpcException(error);
    // }
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    // return `Elimina el producto : ${id}`;
    return this.productClient.send({ cmd: 'delete_product' }, { id }).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  @Patch(':id')
  patchProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    // patchProduct(@Param('id') id: string, @Body() body: any) {
    // return `Actualiza el producto: ${id}`;
    return this.productClient
      .send(
        { cmd: 'update_product' },
        {
          id,
          ...updateProductDto,
        },
      )
      .pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );
  }
}
