import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { disconnect } from 'mongoose';
import { AuthDto } from 'src/auth/dto/auth.dto';
import { USER_NOT_FOUND, WRONG_PASSWORD } from 'src/auth/auth.consts';

const loginDto: AuthDto = {
    login: 'yelaman@mail.ru',
    password: '12345'
}

describe('AuthController (e2e)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();

    });

    it('/auth/login (POST)  - success ', (done) => {
        request(app.getHttpServer())
            .post('/auth/login')
            .send(loginDto)
            .expect(200)
            .then(({ body }: request.Response) => {
                expect(body.access_token).toBeDefined();
                done();
            });
    });

    it('/auth/login (POST)  - fail login not found ', () => {
        request(app.getHttpServer())
            .post('/auth/login')
            .send({ ...loginDto, login: 'yelaman1@mail.ru' })
            .expect(401, {
                "message": "USER_NOT_FOUND",
                "error": "Unauthorized",
                "statusCode": 401
            });
    });

    it('/auth/login (POST)  - fail pasword not valid', () => {

        request(app.getHttpServer())
            .post('/auth/login')
            .send({ ...loginDto, password: '123456' })
            .expect(401, {
                "message": "WRONG_PASSWORD",
                "error": "Unauthorized",
                "statusCode": 401
            });
    });
    afterAll(() => {
        disconnect();
    })
});
