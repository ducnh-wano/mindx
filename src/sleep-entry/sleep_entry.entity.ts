import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
export class SleepEntry {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    date: Date;

    @Column()
    sleepTime: Date;

    @Column()
    wakeUpTime: Date;

    @Column()
    totalSleepDuration: number;

    @Column()
    userId: number;

    @Column()
    sleepHour: number;

    @Column()
    wakeUpHour: number;
}