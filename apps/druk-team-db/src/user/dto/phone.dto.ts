import { IsNotEmpty, IsNumberString } from 'class-validator';
export class PhoneDto{
        
        @IsNotEmpty()
        @IsNumberString()
        public phone : string;

        @IsNotEmpty()
        public userId: string;

    }