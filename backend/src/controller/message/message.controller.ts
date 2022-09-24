import { Controller, Get, Res, HttpStatus } from '@nestjs/common';
import { MessageService } from 'src/services/message/message/message.service';

@Controller('message')
export class MessageController {
    constructor(private readonly _messageServices:MessageService){}
    @Get()
    async getAll(@Res() response:any){
        return this._messageServices.getAll().then(message=>{
            response.status(HttpStatus.OK).json(message);
        }).catch(
            ()=>{response.status(HttpStatus.NOT_FOUND).json({message:"Not Found"})}
        );
    }
}
