import { Injectable,NotAcceptableException,NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AddressDto } from './dto/address.dto';
import { PhoneDto } from './dto/phone.dto';
import { RegisterDto } from './dto/register.dto';
import { UserDto } from './dto/user.dto';


@Injectable()
export class UserService {
    constructor(
        @InjectModel("User") private readonly userModel: Model<UserDto>,
        @InjectModel("Phone") private readonly phoneModel: Model<PhoneDto>,
        @InjectModel("Address") private readonly addressModel: Model<AddressDto>,
        private jwtService: JwtService,
    ){
    }

    async register(
        user: RegisterDto
        ){
        
        try{
            if(await this.userModel.findOne({email: user.email}) || await this.phoneModel.findOne({phone:user.phone}) ){
                throw new NotAcceptableException("Invlaid Credientials");
            }
            const newUser =  new this.userModel({name:user.name, password:user.password, email:user.email}).save();
            await new this.phoneModel({phone:user.phone,userId:(await newUser)._id}).save()
            await new this.addressModel({address:user.address, userId: (await newUser)._id}).save()
            const payload = {
                userId: (await newUser)._id,
                userName: (await newUser).name
              };
          
              return {
                access_token: this.jwtService.sign(payload),
                success: true
              };
        }
        catch(e){                       
            return  {
                message: e,
                success: false
            };
        }
    }

   async findUserByPhone(phone:string){
    
        const result = await this.phoneModel.findOne({phone:phone});
        if(!result){
            throw new NotFoundException("Invalid Creditential")
        }
        return result.userId;
   }

   async findUserById(id:string){
        console.log(id) 
     const result = await this.userModel.findById(id).exec();
     if(!result){
         throw new NotFoundException("Invalid Creditential")
     }
     return result;


}


}
