import { CreateReportDto } from './dtos/create-report.dto';
import { User } from './../users/user.entity';
import { Report } from './report.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { GetEstimateDto } from './dtos/get-estimate.dto';

@Injectable()
export class ReportsService {
    constructor(@InjectRepository(Report) private repo: Repository<Report>) { }

    createReport(body: CreateReportDto, user: User) {
        const report = this.repo.create(body)
        report.user = user
        return this.repo.save(report)
    }

    getEstimate({ model, year, lng, lat, mileage }: GetEstimateDto) {
        return this.repo.createQueryBuilder()
            .select('avg(price)', 'price')
            .where('model = :model', { model })
            // use where just one time then use andWhere
            // because second where will override first where and so on
            .andWhere('year - :year BETWEEN -3 AND 3', { year })
            .andWhere('lng - :lng BETWEEN -5 AND 5', { lng })
            .andWhere('lat - :lat BETWEEN -5 AND 5', { lat })
            .andWhere('approved IS true')
            .orderBy('ABS(mileage - :mileage)', 'DESC')
            .setParameters({ mileage })
            .limit(1)
            // .getRawMany()
            .getRawOne()
    }

    async changeApproval(id: number, approved: boolean) {
        const report = await this.repo.findOne({ where: { id } })
        report.approved = approved
        return this.repo.save(report)
    }
}
