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
        return this._messageRepository.find({relations:['user']});
    }
}
