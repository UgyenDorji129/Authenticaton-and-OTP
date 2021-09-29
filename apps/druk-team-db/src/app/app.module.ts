import { Module } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';


@Module({
  imports: [

    MongooseModule.forRoot('mongodb+srv://DrukTeam:Pl2izL4UdLFhQxmx@cluster0.ita5e.mongodb.net/DrukTeam?retryWrites=true&w=majority'),
    UserModule,
    AuthModule
   
  ],
  exports:[UserModule]
})
export class AppModule {}