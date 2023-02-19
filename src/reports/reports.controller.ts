import { ConfigService } from '@nestjs/config';
import { GetEstimateDto } from './dtos/get-estimate.dto';
import { AdminGuard } from './../guards/admin.guard';
import {
    Controller,
    Post,
    Body,
    UseGuards,
    Param,
    Patch,
    Get,
    Query
} from '@nestjs/common';
import { User } from './../users/user.entity';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dtos/create-report.dto';
import { ReportDto } from './dtos/report.dto';
import { Auth } from '../guards/auth.guard'
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { Serialize } from 'src/interceptors/serialize.interceptor';

@Controller('reports')
export class ReportsController {
    constructor(private reportsService: ReportsService) { }

    @Post()
    @UseGuards(Auth)
    @Serialize(ReportDto)
    createReport(@Body() body: CreateReportDto, @CurrentUser() user: User) {
        return this.reportsService.createReport(body, user)
    }

    @Get()
    getEstimate(@Query() query: GetEstimateDto) {
        return this.reportsService.getEstimate(query)
    }

    @Patch('/:id')
    @UseGuards(AdminGuard)
    changeApproval(@Param('id') id: string, @Body() body: { approved: boolean }) {
        return this.reportsService.changeApproval(parseInt(id), body.approved)
    }

}
