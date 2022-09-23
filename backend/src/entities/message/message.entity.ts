import { Entity,PrimaryGeneratedColumn,Column,ManyToOne,JoinColumn } from 'typeorm'
import { User } from '../user/user.entity';

@Entity()
export class Message {
    @PrimaryGeneratedColumn()
    id:number;
    @Column('text')
    message:string;
    @Column('int')
    user_id:number;
    @ManyToOne(type=>User)
    @JoinColumn({name:'user_id',referencedColumnName:'id'})
    user:User;
}
