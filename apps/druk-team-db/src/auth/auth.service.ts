import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { AuthLoginDto } from './dto/auth-login.dto';
import * as bcrypt from 'bcryptjs';


@Injectable()
export class AuthService {

    constructor(
        private usersService: UserService,
        private jwtService: JwtService,){}

        async login(authLoginDto: AuthLoginDto) {

           try{
            const user = await this.validateUser(authLoginDto.phone,  authLoginDto.password);
        
            const payload = {
              userId: user.id,
              userName: user.name
            };
        
            return {
              access_token: this.jwtService.sign(payload),
              success : true
            };
           }
           catch(e){
             return {
               message : e,
               success : false
             };
           }
          }
        
         private async validateUser(phone:string, password: string){
          
            const foundUser = await this.usersService.findUserByPhone(phone);
            if(!foundUser){
              throw new NotFoundException("Invalid creditential")
            }

            const user = await this.usersService.findUserById(foundUser);
            if(!user){
              throw new NotFoundException("Invalid creditential")
            }
           
            if (await bcrypt.compare(password,user.password)) {
             
              return user;
            }
        
            else{
              throw new UnauthorizedException("Invalid Credientials");
            }
          }

}
