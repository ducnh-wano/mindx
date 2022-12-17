import { HttpStatus, Injectable } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import * as moment from 'moment';
import { Repository } from 'typeorm';
import { SleepEntry } from './sleep_entry.entity';

@Injectable()
export class SleepEntryService {
    constructor(
        @InjectRepository(SleepEntry)
        private sleepEntryRepository: Repository<SleepEntry>,
    ) { }

    async create(params, userId) {
        const { date, sleepTime, wakeUpTime } = params;

        const sleepDate = moment(sleepTime);
        const wakeUpDate = moment(wakeUpTime);
        const wakeUpHour = moment(wakeUpTime).hours();
        const sleepHour = moment(sleepTime).hours();
        const totalSleepDuration = wakeUpDate.diff(sleepDate, 'hours');

        await this.sleepEntryRepository.insert({
            date,
            sleepTime,
            wakeUpTime,
            totalSleepDuration,
            userId,
            wakeUpHour,
            sleepHour
        })

        return {
            statusCode: HttpStatus.CREATED,
            message: 'Created!'
        }
    }

    async delete(id, userId) {
        const sleepEntry = await this.sleepEntryRepository.findOne({
            where: {
                id
            }
        })

        if (!sleepEntry) {
            throw new BadRequestException('Sleep entry does not exists!');
        }

        if (sleepEntry.userId !== userId) {
            throw new BadRequestException('Require permission');
        }

        await this.sleepEntryRepository.delete(id);

        return {
            statusCode: HttpStatus.NO_CONTENT,
            message: 'Deleted!'
        }
    }

    async update(id, body, userId) {
        const sleepEntry = await this.sleepEntryRepository.findOne({
            where: {
                id
            }
        })

        if (!sleepEntry) {
            throw new BadRequestException('Sleep entry does not exists!');
        }

        if (sleepEntry.userId !== userId) {
            throw new BadRequestException('Require permission');
        }

        const { date, sleepTime, wakeUpTime } = body;

        const sleepDate = moment(sleepTime);
        const wakeUpDate = moment(wakeUpTime);
        const wakeUpHour = moment(wakeUpTime).hours();
        const sleepHour = moment(sleepTime).hours();
        const totalSleepDuration = wakeUpDate.diff(sleepDate, 'hours');

        await this.sleepEntryRepository.update(id, {
            date,
            sleepTime,
            wakeUpTime,
            totalSleepDuration,
            userId,
            wakeUpHour,
            sleepHour
        })

        return {
            statusCode: HttpStatus.NO_CONTENT,
            message: 'Updated!'
        }
    }

    async getAverage(userId) {
        const today = moment();
        const fromDate = today.startOf('week').toDate();
        const toDate = today.endOf('week').toDate();

        const average = await this.sleepEntryRepository.createQueryBuilder('sleep_entry')
            .where('sleep_entry.userId = :userId', { userId })
            .andWhere('sleep_entry.date >= :fromDate', { fromDate })
            .andWhere('sleep_entry.date <= :toDate', { toDate })
            .select('AVG(totalSleepDuration)', 'avarageTotalSleepDuration')
            .addSelect('AVG(wakeUpHour)', 'avarageWakeUpTime')
            .addSelect('AVG(sleepHour)', 'avaragesleepTime')
            .getRawOne();

        return {
            statusCode: HttpStatus.OK,
            data: {
                avarageTotalSleepDuration: parseInt(average.avarageTotalSleepDuration),
                avarageWakeUpTime: parseInt(average.avarageWakeUpTime),
                avaragesleepTime: parseInt(average.avarageWakeUpTime)
            }
        }
    }
}
