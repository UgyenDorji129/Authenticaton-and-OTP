import { IsNotEmpty } from 'class-validator';
export class AddressDto{

        @IsNotEmpty()
        public address : string;

        @IsNotEmpty()
        public userId: string;

    }