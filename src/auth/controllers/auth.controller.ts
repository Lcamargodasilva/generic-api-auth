import { Body, Controller, HttpCode, HttpStatus, Inject, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { ApiBadRequestResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginDto } from '../dtos/login.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {

  @Inject()
  private readonly authService: AuthService;

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'User login' })
  @ApiOkResponse({ description: 'User logged in successfully.' })
  @ApiBadRequestResponse({ description: 'User not found.' })
  async signIn(@Body() body: LoginDto) {
    return this.authService.signIn(body);
  }
}