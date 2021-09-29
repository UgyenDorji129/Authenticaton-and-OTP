import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { UserModule } from '../user/user.module';


@Module({
  imports: [
    JwtModule.register(
      {
      secret: 'secret',
      signOptions: {expiresIn: '1s'}
      }),
    UserModule,
  ],
  providers: [AuthService,JwtStrategy],
  controllers: [AuthController],
  exports:[AuthModule]
})
export class AuthModule {}
