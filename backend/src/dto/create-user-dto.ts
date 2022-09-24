import { ApiProperty } from '@nestjs/swagger'

export class CreateUserDto {
    @ApiProperty()
    readonly id:number;
    @ApiProperty()
    readonly username:string;
    @ApiProperty()
    readonly password:string;
    @ApiProperty()
    readonly created:Date
}