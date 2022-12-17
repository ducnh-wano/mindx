import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './user/user.entity';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { SleepEntryModule } from './sleep-entry/sleep-entry.module';
import { SleepEntry } from './sleep-entry/sleep_entry.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'mindx',
      entities: [User, SleepEntry],
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    AdminModule,
    SleepEntryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
