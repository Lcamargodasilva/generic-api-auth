import { Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/services/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from '../dtos/login.dto';

@Injectable()
export class AuthService {
  @Inject()
  private readonly userService: UserService;
  @Inject()
  private readonly jwtService: JwtService;

  async signIn(dto: LoginDto): Promise<{ access_token: string }> {
    const user = await this.userService.user({ email: dto.email });
    if (!user) throw new NotFoundException('User not found');

    const passwordMatch = await bcrypt.compare(dto.password, user.password);
    if (!passwordMatch) throw new UnauthorizedException('Invalid credentials');

    const payload = { sub: user.id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
