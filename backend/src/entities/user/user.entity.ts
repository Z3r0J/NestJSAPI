import { Entity,PrimaryGeneratedColumn,Column,OneToMany } from 'typeorm'
import { Message } from '../message/message.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn({name:"UserId"})
    id:number;
    @Column({name:"Username"})
    username:string;
    @Column({name:"Password"})
    @Column({select: false})
    password:string;
    @Column('date',{name:"Created"})
    created:Date;
    @OneToMany(type=>Message, message=>message.user,{onDelete:'CASCADE'})
    message:Message[];
}
