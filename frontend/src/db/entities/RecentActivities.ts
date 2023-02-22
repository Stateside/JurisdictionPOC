import { IRecentActivities, ActivitiesItem } from "../interfaces/IRecentActivities"
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class RecentActivities implements IRecentActivities {
  constructor(init?:Partial<RecentActivities>) {
    Object.assign(this, init)
  }

  @PrimaryGeneratedColumn()
  id: number

  @Column({
    length: 128,
  })
  url: string
  
  @Column({
    length: 255,
  })
  text: string

  @Column({
    type: "enum",
    enum: ActivitiesItem
  })
  itemType: ActivitiesItem

  @Column({
    length:128
  })
  account: string

  @Column({
    length: 128,
  })
  frontend: string
  
  @Column('int')
  chainId: number

  @CreateDateColumn()
  createdAt: Date

}