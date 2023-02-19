import { IsString, IsNumber, Min, Max, IsLongitude, IsLatitude } from 'class-validator';
import { Transform } from 'class-transformer';

export class GetEstimateDto {
    @IsString()
    model: string

    @Transform(({ value }) => parseInt(value))
    @IsNumber()
    @Min(1930)
    @Max(2050)
    year: number

    @Transform(({ value }) => parseFloat(value))
    @IsNumber()
    @IsLatitude()
    lat: number

    @Transform(({ value }) => parseFloat(value))
    @IsNumber()
    @IsLongitude()
    lng: number

    @Transform(({ value }) => parseInt(value))
    @IsNumber()
    @Max(500000)
    mileage: number
}