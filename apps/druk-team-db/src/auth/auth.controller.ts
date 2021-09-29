import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('drukteam')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Post("login")
    async loginWithPhone(
    @Body("phone") phone: string,
    @Body("password") password: string){

        try{
            return await this.authService.login({password,phone});
        }
        catch(e){
            return e;
        }
    }

}
