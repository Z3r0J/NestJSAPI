import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder,SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const swaggerConfig = new DocumentBuilder()
  .setTitle('Message API')
  .setDescription('Message API Where user can add Message')
  .setVersion('1.0')
  .build();

  const swaggerDocument = SwaggerModule.createDocument(app,swaggerConfig);

  SwaggerModule.setup('/',app,swaggerDocument);

  await app.listen(3000);
}
bootstrap();
