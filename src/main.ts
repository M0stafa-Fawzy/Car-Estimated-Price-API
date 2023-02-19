// import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import statement does not work proberly with cookie-session library
// const cookieSession = require("cookie-session")

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // move it to app.modle.ts to work with dev and test environments
  // app.use(cookieSession({
  //   keys: ['first']
  // }))

  // app.useGlobalPipes(new ValidationPipe({
  //   whitelist: true // remove unwanted properties from request body
  // }))
  await app.listen(3000);
}
bootstrap();