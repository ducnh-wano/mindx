import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    username: string;

    @Column({ select: false })
    password: string;

    @Column()
    email: string;

    @Column()
    name: string;

    @Column()
    age: number;

    @Column({ default: false })
    isAdmin: boolean;
}