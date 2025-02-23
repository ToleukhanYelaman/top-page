import { Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ProductModel } from './product.model/product.model';
import { FindProductDto } from './dto/find-product.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductService } from './product.service';
import { PRODUCT_NOT_FOUND } from './product.constants';
import { IdVAlidationPipe } from 'src/pipes/id-validation.pipe';

@Controller('product')
export class ProductController {

    constructor(private readonly productService: ProductService) { }

    @Post('create')
    async create(@Body() dto: CreateProductDto) {
        return this.productService.create(dto);
    }

    @Get(':id')
    async get(@Param('id', IdVAlidationPipe) id: string) {
        const product = await this.productService.findById(id);
        if(!product){
            throw new NotFoundException(PRODUCT_NOT_FOUND);
        } 
        return product;
    }

    @Delete(':id')
    async delete(@Param('id', IdVAlidationPipe) id: string) {
        const deletedProduct = await this.productService.deleteById(id);
        if(!deletedProduct){
            throw new NotFoundException(PRODUCT_NOT_FOUND);
        }
    }

    @Patch(':id')
    async patch(@Param('id', IdVAlidationPipe) id: string, @Body() dto: CreateProductDto) {
        const updatedProduct = await this.productService.updateById(id, dto);
        if(!updatedProduct){
            throw new NotFoundException(PRODUCT_NOT_FOUND);
        }
        return updatedProduct;
    }

    @UsePipes(new ValidationPipe())
    @HttpCode(200)
    @Post('find')
    async find(@Body() dto: FindProductDto) {
        return this.productService.findWithReviews(dto);
    }
}
