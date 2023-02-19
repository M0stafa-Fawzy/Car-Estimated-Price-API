import { IsString, IsNumber, Min, Max, IsLongitude, IsLatitude } from 'class-validator'

export class CreateReportDto {
    @IsNumber()
    @Min(0)
    price: number

    @IsString()
    model: string

    @IsNumber()
    @Min(1930)
    @Max(2050)
    year: number

    @IsNumber()
    @IsLatitude()
    lat: number

    @IsNumber()
    @IsLongitude()
    lng: number

    @IsNumber()
    @Max(500000)
    mileage: number
}