import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ProductModel } from './product.model/product.model';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { CreateProductDto } from './dto/create-product.dto';
import { FindProductDto } from './dto/find-product.dto';
import { ReviewModel } from 'src/review/review.model/review.model';

@Injectable()
export class ProductService {
    constructor(@InjectModel(ProductModel) private readonly productModel: ModelType<ProductModel>) { }


    async create(dto: CreateProductDto): Promise<ProductModel> {
        return this.productModel.create(dto);
    }

    async findById(id: string): Promise<ProductModel> {
        return this.productModel.findById(id).exec();
    }

    async deleteById(id: string): Promise<ProductModel> {
        return this.productModel.findByIdAndDelete(id).exec();
    }

    async updateById(id: string, dto: CreateProductDto): Promise<ProductModel> {
        return this.productModel.findByIdAndUpdate(id, dto, { new: true }).exec();
    }

    async findWithReviews(dto: FindProductDto) {
        return this.productModel.aggregate([
            {
                $match: {
                    categories: dto.category
                }
            },
            {
                $sort: {
                    _id: 1
                }
            },
            {
                $limit: dto.limit
            },
            {
                $lookup: {
                    from: 'Review',
                    localField: '_id',
                    foreignField: 'productId',
                    as: 'review'
                }
            },
            {
                $addFields: {
                    reviewCount: { $size: '$review' },
                    reviewAvg: { $avg: '$review.rating' }
                }
            }
        ]).exec();
    }
}
