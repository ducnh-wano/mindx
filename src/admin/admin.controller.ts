import { Body, Controller, Delete, Param, Put, Get } from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import { AdminGuard } from './admin.guard';
import { AdminService } from './admin.service';

@Controller('admins')
export class AdminController {
  constructor(
    private readonly adminService: AdminService
  ) { }

  @Get('users')
  @UseGuards(AdminGuard)
  async findUsers() {
    return this.adminService.findUsers();
  }

  @Delete('users/:id')
  @UseGuards(AdminGuard)
  async deleteUser(@Param('id') id: number) {
    return this.adminService.deleteUser(id);
  }

  @Put('users/:id')
  @UseGuards(AdminGuard)
  async updateUser(@Param('id') id: number, @Body() body) {
    return this.adminService.updateUser(id, body);
  }
}
