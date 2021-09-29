
import { IsEmail, IsNotEmpty } from 'class-validator';

export class AuthLoginDto{
    @IsNotEmpty()
    phone: string;

    @IsNotEmpty()
    password: string;
}