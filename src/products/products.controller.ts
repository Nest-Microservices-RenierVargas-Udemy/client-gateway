import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { PaginatinoDto } from 'src/common';
import { PRODUCT_SERVICE } from 'src/config';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject(PRODUCT_SERVICE) private readonly productClient: ClientProxy,
  ) {}

  @Post()
  createProdcut() {
    return 'Crear un producto';
  }

  @Get()
  findAllProducts(@Query() paginatinoDto: PaginatinoDto) {
    return this.productClient.send({ cmd: 'find_all' }, paginatinoDto);
    // return this.productClient.send({cmd: 'find_all'}, { limit : 2 , page:2 })
  }

  @Get(':id')
  async findOneProduct(@Param('id') id: string) {
    try {
      const product = await firstValueFrom(
        this.productClient.send({ cmd: 'find_one_product' }, { id: id }),
      );
      return product;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    return `Elimina el producto : ${id}`;
  }

  @Patch(':id')
  patchProduct(@Param('id') id: string, @Body() body: any) {
    return `Actualiza el producto: ${id}`;
  }
}
