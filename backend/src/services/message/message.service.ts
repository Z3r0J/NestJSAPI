import { UpdateMessageDto } from './../../dto/update-message-dto';
import { CreateMessageDto } from './../../dto/create-message-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Message } from 'src/entities/message/message.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MessageService {
    constructor(
        @InjectRepository(Message)
        private readonly _messageRepository:Repository<Message>,
    ) {}

    public async getAll() {
        return await this._messageRepository.find({relations:['user']});
    }

    public async getById(id:number){
        return await this._messageRepository.findOne({relations:['user'],where:{id:id}})
    }

    public async createMessage(messageDto:CreateMessageDto){
        
        const message = new Message();
        message.message = messageDto.message;
        message.user_id = messageDto.user_id;
        
        return await this._messageRepository.save(message);
    }

    public async updateMessage(id:number,messageDto:UpdateMessageDto){

        const message = await this._messageRepository.findOne({where:{id:id}});
        message.message = messageDto.message;
        
        return await this._messageRepository.save(message);
    }

    public async deleteMessage(id:number){
        return await this._messageRepository.delete(id);
    }

}
