import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewService } from './review.service';
import { ReviewModel } from './review.model/review.model';
import { DocumentType } from '@typegoose/typegoose/lib/types';
import { REVIEW_NOT_FOUND } from './review.constants';
import { JWTAuthGuard } from '../auth/guards/jwt.guard';
import { UserEmail } from '../decorators/user-email.decorator';
import { IdVAlidationPipe } from 'src/pipes/id-validation.pipe';

@Controller('review')
export class ReviewController {

    constructor(private readonly reviewService: ReviewService) { }

    @Post('create')
    @UsePipes(new ValidationPipe())
    async create(@Body() dto: CreateReviewDto): Promise<DocumentType<ReviewModel>> {
        return this.reviewService.create(dto);
    }

    @UseGuards(JWTAuthGuard)
    @Delete(':id')
    async delete(@Param('id', IdVAlidationPipe) id: string) {
        const deleteDoc = this.reviewService.delete(id);

        if (!deleteDoc) {
            throw new HttpException(REVIEW_NOT_FOUND, HttpStatus.NOT_FOUND);
        }
    }

    @Get('byProduct/:productId')
    async getByProduct(@Param('productId', IdVAlidationPipe) productId: string, @UserEmail() email: string): Promise<DocumentType<ReviewModel>[] | null> {
        return this.reviewService.findByProductId(productId)
    }
}
