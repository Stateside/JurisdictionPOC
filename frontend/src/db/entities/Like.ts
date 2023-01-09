import { ILike, LikableItem } from "db/interfaces/ILike"
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

@Entity()
export class Like implements ILike {
  constructor(init?:Partial<Like>) {
    Object.assign(this, init)
  }

  @PrimaryGeneratedColumn()
  id: number
  
  @Column({
    length: 255,
    nullable: true
  })
  name: string

  @Column({
    type: "enum",
    enum: LikableItem
  })
  itemType: LikableItem

  @Column({
    length: 255
  })
  itemId: string

  @Column('char', {
    length: 42
  })
  jurisdiction: string

  @Column('char', {
    length: 42
  })
  owner: string

  @Column({
    length: 128,
  })
  frontend: string
  
  @Column('int')
  chainId: number

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()  
  updatedAt: Date
}
