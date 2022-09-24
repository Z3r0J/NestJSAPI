import { CreateUserDto } from '../../dto/create-user-dto';
import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { UserService } from 'src/services/user/user.service';
import { ApiTags,ApiResponse,ApiOperation } from '@nestjs/swagger'

@Controller('user')
@ApiTags('User')
export class UserController {
    constructor(private readonly _userServices:UserService) {}
    @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
    @ApiResponse({ status: 500, description: 'Internal Server Error'})
    @ApiOperation({summary:'Create User',description:'This is the endpoint when you can create a user'})
    @Post()
    async create(@Body() createuserDTO:CreateUserDto,@Res() response:any){
        return await this._userServices.createUser(createuserDTO).then(
            (message)=>{response.status(HttpStatus.CREATED).json(message);
            }).catch(()=>{
            response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message:"Error while trying create the user."});
        });
    }
    @ApiResponse({ status: 200, description: 'OK'})
    @ApiResponse({ status: 404, description: 'NOT FOUND'})    
    @ApiOperation({summary:'Get all Users',description:'This is the endpoint where you can get all user existing in the database'})
    @Get()
    async getAll(@Res() response:any){
        return await this._userServices.getAll().then(users=>{
            response.status(HttpStatus.OK).json(users);
        }).catch(()=>{
            response.status(HttpStatus.NOT_FOUND).json({message:"Not User Found"});
        });
    }
    @ApiResponse({ status: 200, description: 'OK'})
    @ApiResponse({ status: 404, description: 'NOT FOUND'})
    @ApiOperation({summary:'Get User By Id',description:'This is the endpoint where you can get user by id existing in the database'})
    @Get(":id")
    async getById(@Res() response:any,@Param('id') id:number){
        return await this._userServices.getById(id).then(users=>{
            response.status(HttpStatus.OK).json(users);
        }).catch(()=>{
            response.status(HttpStatus.NOT_FOUND).json({message:"Not User Found"});
        });
    }

    @ApiResponse({ status: 200, description: 'OK'})
    @ApiResponse({ status: 500, description: 'INTERNAL SERVER ERROR'})
    @ApiOperation({summary:'Update User',description:'This is the endpoint where you can update an existing user by id in the database'})
    @Put(":id")
    async update(@Body() userupdateDTO:CreateUserDto,@Param('id') id:number,@Res() response:any){
        return await this._userServices.updateUser(id,userupdateDTO).then(message=>{
            response.status(HttpStatus.OK).json(message);
        }).catch(()=>{
        response.status().json(HttpStatus.INTERNAL_SERVER_ERROR).json({message:"Error while trying update the user."});
        });
    }

    @ApiResponse({ status: 204, description: 'NO Content'})
    @ApiResponse({ status: 500, description: 'INTERNAL SERVER ERROR'})
    @ApiOperation({summary:'Delete User',description:'This is the endpoint where you can delete an existing user by id in the database'})
    @Delete(":id")
    async delete(@Param('id') id:number,@Res() response:any){
        return await this._userServices.deleteUser(id).then(res=>{
            response.status(HttpStatus.NO_CONTENT).json(res);
        }).catch(()=>{
            response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message:"Error while trying delete the user."});
        })
    }

}
