import { Type } from "class-transformer";
import { IsArray, IsString, IsOptional, IsNumber, ValidateNested } from "class-validator";

class ProductChacteristicDto {
    @IsString()
    name: string;

    @IsString()
    value: string;
}


export class CreateProductDto {

    @IsString()
    image: string;

    @IsString()
    title: string;

    @IsNumber()
    price: number;

    @IsOptional()
    @IsNumber()
    oldPrice?: number;

    @IsNumber()
    credit: number;

    @IsString()
    description: string;

    @IsString()
    advantages: string;

    @IsString()
    disAdvatages: string;

    @IsArray()
    @IsString({ each: true })
    categories: string[];

    @IsArray()
    @IsString({ each: true })
    tags: string[];

    @IsArray()
    @ValidateNested()
    @Type(() => ProductChacteristicDto)
    characteristics: ProductChacteristicDto[]
}