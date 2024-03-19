import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './httpException.filter';
import { ValidationPipe } from '@nestjs/common';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import session from 'express-session';


declare const module: any;

async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3000;

  app.useGlobalPipes(new ValidationPipe())
  app.useGlobalFilters(new HttpExceptionFilter())

  const config = new DocumentBuilder()
  .setTitle('Sleact APi')
  .setDescription('Sleact 개발을 위한 API 문서')
  .setVersion('1.0')
  .addCookieAuth('connect.sid')
  .build();
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  app.use(cookieParser())
  app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: "myscret",
    cookie: {
      httpOnly: true,
    }
  }))
  app.use(passport.initialize())
  app.use(passport.session())

  await app.listen(port);
  console.log(`서버 시작 포트는 뭘까요 ${port}`)

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close())
  }
}
bootstrap();

// 네스트가 시작 하는 곳