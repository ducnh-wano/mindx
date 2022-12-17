import { Module } from '@nestjs/common';
import { SleepEntryService } from './sleep-entry.service';
import { SleepEntryController } from './sleep-entry.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SleepEntry } from './sleep_entry.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SleepEntry])],
  controllers: [SleepEntryController],
  providers: [SleepEntryService]
})
export class SleepEntryModule { }
