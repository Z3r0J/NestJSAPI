import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './controller/user/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user/user.entity';
import { Message } from './entities/message/message.entity';
import { UserService } from './services/user/user.service';
import { MessageService } from './services/message/message.service';
import { MessageController } from './controller/message/message.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'containers-us-west-89.railway.app',
      port: 5924,
      username: 'root',
      password: 'yWeY9dqg5UUZwXR4NMzw',
      database: 'railway',
      entities: [User,Message],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User,Message])
  ],
  controllers: [AppController, UserController,MessageController],
  providers: [AppService, UserService, MessageService],
})
export class AppModule {}
