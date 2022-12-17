import { Body, Controller, Get, UseGuards, Post, Request, Put, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { SleepEntryService } from '../sleep-entry/sleep-entry.service'
import { UserGuard } from './user.guard';
import { Param } from '@nestjs/common/decorators';
@Controller('users')
export class UserController {
  constructor(
    private sleepEntryService: SleepEntryService
  ) { }

  @Post('profile/me/sleep-entries')
  @UseGuards(UserGuard)
  async createSleepEntries(@Body() body, @Request() req) {
    return this.sleepEntryService.create(body, req.user.id)
  }

  @Put('profile/me/sleep-entries/:id')
  @UseGuards(UserGuard)
  async updateSleepEntry(@Body() body, @Param('id') id, @Request() req) {
    return this.sleepEntryService.update(id, body, req.user.id)
  }

  @Delete('profile/me/sleep-entries/:id')
  @UseGuards(UserGuard)
  async deleteSleepEntry(@Param('id') id, @Request() req) {
    return this.sleepEntryService.delete(id, req.user.id)
  }

  @Get('profile/me/sleep-entries/average')
  @UseGuards(UserGuard)
  async getAvarageSleepEntries(@Request() req) {
    return this.sleepEntryService.getAverage(req.user.id)
  }
}
