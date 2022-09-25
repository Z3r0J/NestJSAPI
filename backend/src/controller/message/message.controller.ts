import { UpdateMessageDto } from './../../dto/update-message-dto';
import { CreateMessageDto } from './../../dto/create-message-dto';
import { Controller, Get, Res, HttpStatus, Param,Post,Delete,Patch,Body } from '@nestjs/common';
import { MessageService } from 'src/services/message/message.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('message')
@ApiTags('Message')
export class MessageController {
    constructor(private readonly _messageServices:MessageService){}
    @Get()
    async getAll(@Res() response:any){
        return this._messageServices.getAll().then(message=>{
            response.status(HttpStatus.OK).json(message);
        }).catch(
            ()=>{response.status(HttpStatus.NOT_FOUND).json({message:"Not Found"});}
        );
    }
    @Get(':id')
    async getById(@Res() response:any,@Param('id') id:number){
        return this._messageServices.getById(id).then(message=>{
            response.status(HttpStatus.OK).json(message);
        }).catch(
            () => { response.status(HttpStatus.NOT_FOUND).json({message:"Not Found"}); }
        );
    }
    @Post()
    async createMessage(@Res() response:any,@Body() message:CreateMessageDto){
        return this._messageServices.createMessage(message).then(message=>{
            response.status(HttpStatus.CREATED).json(message);
        }).catch(()=>{
            response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message:'Internal server error'});
        });
    }
    @Patch(':id')
   async updateMessage(@Res() response:any,@Param('id') id:number,@Body() message:UpdateMessageDto){
        return this._messageServices.updateMessage(id,message).then(message=>{
            response.status(HttpStatus.NO_CONTENT).json(message);
        }).catch(()=>{

        });
   }
}
