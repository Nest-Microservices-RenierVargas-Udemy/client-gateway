import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

@Controller('products')
export class ProductsController {

  constructor() {}


  @Post()
  createProdcut(){
    return 'Crear un producto';
  }

  @Get()
  findAllProducts(){
    return 'Regreso todos los productos';
  }

  @Get(':id')
  findOneProduct(@Param('id') id:string){
    return `Regresa el producto : ${id}`;
  }

  @Delete(':id')
  deleteProduct(@Param('id') id:string){
    return `Elimina el producto : ${id}`;
  }

  @Patch(':id')
  patchProduct(
    @Param('id') id:string,  
    @Body() body:any
  ){
    return `Actualiza el producto: ${id}`;
  }

}
