import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RegisterModule } from './register/register.module';
import { UserModule } from './user/user.module';
import { LoginModule } from './login/login.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [RegisterModule, UserModule, LoginModule],
})
export class AppModule {}
