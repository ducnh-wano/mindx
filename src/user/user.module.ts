import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { SleepEntryService } from 'src/sleep-entry/sleep-entry.service';
import { SleepEntry } from 'src/sleep-entry/sleep_entry.entity';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([User, SleepEntry])],
  controllers: [UserController],
  providers: [UserService, SleepEntryService, JwtService]
})
export class UserModule { }
