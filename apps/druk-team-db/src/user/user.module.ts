import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserSchema } from './model/user.model';
import { PhoneSchema } from './model/phone.model';
import { AddressSchema } from './model/address.model';
import { JwtModule } from '@nestjs/jwt';


@Module({
    imports:[
        JwtModule.register(
            {
            secret: 'secret',
            signOptions: {expiresIn: '1s'}
            }),
        MongooseModule.forFeature([{name: 'User', schema: UserSchema},{name: 'Phone', schema: PhoneSchema}, {name:'Address',schema:AddressSchema}])
    ],

    controllers: [UserController],
    providers: [UserService],
    exports: [UserModule,UserService],
    
})
export class UserModule {}
