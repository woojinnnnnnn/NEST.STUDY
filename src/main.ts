import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3000;

  const config = new DocumentBuilder()
  .setTitle('Sleact APi')
  .setDescription('Sleact 개발을 위한 API 문서')
  .setVersion('1.0')
  .addCookieAuth('connect.sid')
  .build();
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  await app.listen(port);
  console.log(`서버 시작 포트는 뭘까요 ${port}`)

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close())
  }
}
bootstrap();

// 네스트가 시작 하는 곳