import {
  Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post,
  UseGuards, UsePipes, ValidationPipe
} from '@nestjs/common';
import { User as UserModel } from '@prisma/client';
import { UserService } from '../services/user.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Controller('user')
@UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
export class UserController {
  @Inject()
  private readonly userService: UserService;

  @Post()
  async signupUser(@Body() dto: CreateUserDto): Promise<UserModel> {
    return this.userService.createUser(dto);
  }

  @Get('all')
  @UseGuards(AuthGuard)
  async getUsers(): Promise<UserModel[]> {
    return this.userService.users();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async getUserById(@Param('id', ParseIntPipe) id: number): Promise<UserModel | null> {
    return this.userService.user({ id });
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  async updateUser(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateUserDto): Promise<UserModel> {
    return this.userService.updateUser({ where: { id }, data: dto });
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async deleteUser(@Param('id', ParseIntPipe) id: number): Promise<UserModel> {
    return this.userService.deleteUser({ id });
  }
}
