import { Body, Controller, Post } from '@nestjs/common';
import * as bcrypt from  'bcryptjs';
import { UserService } from './user.service';

@Controller('drukteam')
export class UserController {
    constructor(private readonly userService : UserService){}

    @Post("register")
    async register(
        @Body("name") name : string,
        @Body("phone") phone : string,
        @Body("password") password : string,
        @Body("email") email: string,
        @Body("address") address: string
    ){
        const hashedPassword = await bcrypt.hash(password,12);
        return await this.userService.register({name,phone,email,address,password:hashedPassword});

    }

    @Post("userByPhone")
    async findByPhone(
        @Body("phone") phone: string
    ){
        const result = await this.userService.findUserByPhone(phone);
        return result;
    }

    @Post("userById")
    async findById(
        @Body("id") id: string
    ){
        try{
            const result = await this.userService.findUserById(id);
            return result;
        }
        catch(e){
            return e;
        }
    }

    
}
