import { Report } from './../reports/report.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
// import { Exclude } from 'class-transformer'

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    email: string

    @Column({ default: false })
    isAdmin: boolean

    @Column()
    // nest recommented
    // @Exclude()
    password: string

    @OneToMany(() => Report, (report) => report.user)
    reports: Report[]

}