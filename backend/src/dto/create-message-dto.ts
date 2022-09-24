import { ApiProperty } from '@nestjs/swagger'

export class CreateMessageDto {
    @ApiProperty()
    readonly id:number;
    @ApiProperty()
    readonly message:string;
    @ApiProperty()
    readonly user_id:number;
}
