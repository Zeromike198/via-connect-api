import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RegisterModule } from './register/register.module';
import { UserModule } from './user/user.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [RegisterModule, UserModule],
})
export class AppModule {}
