import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { UserModel } from './user.model';
import { genSaltSync, hashSync, compare } from 'bcryptjs';
import { InjectModel } from 'nestjs-typegoose';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        @InjectModel(UserModel) private readonly userModel: ModelType<UserModel>,
        private readonly jwtService: JwtService
    ) { }

    async createUser(dto: AuthDto) {
        const salt = genSaltSync(10);
        const newUser = new this.userModel({
            email: dto.login,
            passwordHash: hashSync(dto.password, salt)
        });

        return newUser.save();
    }

    async findUser(email: string) {
        return this.userModel.findOne({ email }).exec();
    }

    async validateUser(email: string, password: string): Promise<Pick<UserModel, 'email'>> {
        const user = await this.findUser(email);
        if (!user) {
            throw new UnauthorizedException('USER_NOT_FOUND');
        }

        const isPasswordCorrect = await compare(password, user.passwordHash);
        if (!isPasswordCorrect) {
            throw new UnauthorizedException('WRONG_PASSWORD');
        }

        return { email: user.email };
    }

    async login(email: string) {
        const payLoad = { email };
        return {
            access_token: await this.jwtService.signAsync(payLoad)
        }
    }
}
