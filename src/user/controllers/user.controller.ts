import {
  Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post,
  UseGuards, UsePipes, ValidationPipe
} from '@nestjs/common';
import { User as UserModel } from '@prisma/client';
import { UserService } from '../services/user.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

@Controller('user')
@ApiTags('User')
@UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
export class UserController {
  @Inject()
  private readonly userService: UserService;

  @Post()
  @ApiOperation({ summary: 'Create user (signup)' })
  @ApiCreatedResponse({ description: 'User created successfully.' })
  @ApiBadRequestResponse({ description: 'Validation failed.' })
  async signupUser(@Body() dto: CreateUserDto): Promise<UserModel> {
    return this.userService.createUser(dto);
  }

  @Get('all')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'List all users' })
  @ApiOkResponse({ description: 'Users listed successfully.' })
  @ApiUnauthorizedResponse({ description: 'Missing or invalid token.' })
  @UseGuards(AuthGuard)
  async getUsers(): Promise<UserModel[]> {
    return this.userService.users();
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user by id' })
  @ApiOkResponse({ description: 'User returned successfully.' })
  @ApiNotFoundResponse({ description: 'User not found.' })
  @ApiUnauthorizedResponse({ description: 'Missing or invalid token.' })
  @UseGuards(AuthGuard)
  async getUserById(@Param('id', ParseIntPipe) id: number): Promise<UserModel | null> {
    return this.userService.user({ id });
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update user by id' })
  @ApiOkResponse({ description: 'User updated successfully.' })
  @ApiBadRequestResponse({ description: 'Validation failed.' })
  @ApiNotFoundResponse({ description: 'User not found.' })
  @ApiUnauthorizedResponse({ description: 'Missing or invalid token.' })
  @UseGuards(AuthGuard)
  async updateUser(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateUserDto): Promise<UserModel> {
    return this.userService.updateUser({ where: { id }, data: dto });
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete user by id' })
  @ApiOkResponse({ description: 'User deleted successfully.' })
  @ApiNotFoundResponse({ description: 'User not found.' })
  @ApiUnauthorizedResponse({ description: 'Missing or invalid token.' })
  @UseGuards(AuthGuard)
  async deleteUser(@Param('id', ParseIntPipe) id: number): Promise<UserModel> {
    return this.userService.deleteUser({ id });
  }
}
