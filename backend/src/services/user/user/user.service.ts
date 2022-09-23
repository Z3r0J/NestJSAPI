import { CreateUserDto } from './../../../dto/create-user-dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { User } from 'src/entities/user/user.entity';
import { Repository } from 'typeorm'

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly _userRepository: Repository<User>,
    ){}

    public async getAll() {
        return await this._userRepository.find({relations:['message']});
    }

    public async getById(id:number){

        return await this._userRepository.findOne({relations:['message'],where:{id:id}});
    }

    public async createUser(userDTO:CreateUserDto){
        const user = new User();
        user.username = userDTO.username;
        user.password = userDTO.password;
        user.created = new Date();

        await this._userRepository.save(user);
    }

    public async updateUser(id:number,userDTO:CreateUserDto){
        const user = await this._userRepository.findOne({where:{id:id}});
        user.username = userDTO.username;
        user.password = userDTO.password;

        await this._userRepository.save(user);
    }

    public async deleteUser(id:number){
        return await this._userRepository.delete(id);
    }
}
