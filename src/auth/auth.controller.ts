import { BadRequestException, Body, Controller, HttpCode, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { ALREADY_EXISTS_ERROR } from './auth.consts';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) { }

    @Post('register')
    @UsePipes(new ValidationPipe())
    async register(@Body() dto: AuthDto) {
        const oldUser = await this.authService.findUser(dto.login);
        if (oldUser) {
            throw new BadRequestException(ALREADY_EXISTS_ERROR);
        }

        return this.authService.createUser(dto);
    }

    @HttpCode(200)
    @Post('login')
    async login(@Body() { login, password }: AuthDto) {
        const user = await this.authService.validateUser(login, password);
        return this.authService.login(login); 
    }
}
