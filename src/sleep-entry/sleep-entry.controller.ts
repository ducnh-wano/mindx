import { Controller } from '@nestjs/common';
import { SleepEntryService } from './sleep-entry.service';

@Controller('sleep-entry')
export class SleepEntryController {
  constructor(private readonly sleepEntryService: SleepEntryService) {}
}
