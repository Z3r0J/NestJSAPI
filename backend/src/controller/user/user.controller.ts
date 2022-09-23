import { CreateUserDto } from '../../dto/create-user-dto';
import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { UserService } from 'src/services/user/user/user.service';

@Controller('user')
export class UserController {
    constructor(private readonly _userServices:UserService) {}
    @Post()
    async create(@Body() createuserDTO:CreateUserDto,@Res() response:any){
        return await this._userServices.createUser(createuserDTO).then(
            (message)=>{response.status(HttpStatus.CREATED).json(message);
            }).catch(()=>{
            response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message:"Error while trying create the user."});
        });
    }

    @Get()
    async getAll(@Res() response:any){
        return await this._userServices.getAll().then(users=>{
            response.status(HttpStatus.OK).json(users);
        }).catch(()=>{
            response.status(HttpStatus.NOT_FOUND).json({message:"Not User Found"});
        });
    }

    @Get(":id")
    async getById(@Res() response:any,@Param('id') id:number){
        return await this._userServices.getById(id).then(users=>{
            response.status(HttpStatus.OK).json(users);
        }).catch(()=>{
            response.status(HttpStatus.NOT_FOUND).json({message:"Not User Found"});
        });
    }

    @Put(":id")
    async update(@Body() userupdateDTO:CreateUserDto,@Param('id') id:number,@Res() response:any){
        return await this._userServices.updateUser(id,userupdateDTO).then(message=>{
            response.status(HttpStatus.OK).json(message);
        }).catch(()=>{
        response.status().json(HttpStatus.INTERNAL_SERVER_ERROR).json({message:"Error while trying update the user."});
        });
    }

    @Delete(":id")
    async delete(@Param('id') id:number,@Res() response:any){
        return await this._userServices.deleteUser(id).then(res=>{
            response.status(HttpStatus.NO_CONTENT).json(res);
        }).catch(()=>{
            response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message:"Error while trying delete the user."});
        })
    }

}
