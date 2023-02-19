import { Expose, Transform } from 'class-transformer'

export class ReportDto {
    @Expose()
    id: number

    @Expose()
    price: number

    @Expose()
    model: string

    @Expose()
    year: number

    @Expose()
    lat: number

    @Expose()
    lng: number

    @Expose()
    mileage: number

    @Expose()
    approved: boolean
    // add nre prop by transforming existing one
    // take the original obj => take thei d from it
    // assign it to this new prop
    @Transform(({ obj }) => obj.user.id)
    @Expose()
    userId: number
}