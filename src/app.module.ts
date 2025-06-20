import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RegisterModule } from './register/register.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [RegisterModule],
})
export class AppModule {}
