import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Auth (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should sign up', () => {
    return request(app.getHttpServer())
      .post('/auth/signup')
      .send({
        email: "test@gmail.com",
        password: '123456'
      })
      .expect(201)
      .then((res) => {
        const { id, email } = res.body
        expect(id).toBeDefined()
        expect(email).toEqual('test@gmail.com')
      })
  });


  it('should sign up and get signed up user', async () => {
    const res = await request(app.getHttpServer())
      .post('/auth/signup')
      .send({
        email: "test@gmail.com",
        password: '123456'
      })
      .expect(201)

    const cookie = res.get('Set-Cookie')
    const { body } = await request(app.getHttpServer())
      .get('/auth/profile')
      .set('Cookie', cookie)
      .expect(200)

    expect(body.email).toEqual('test@gmail.com')
  });
});
