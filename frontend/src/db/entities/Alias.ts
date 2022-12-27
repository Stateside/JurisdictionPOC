import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm"

@Entity()
export class Alias {
  constructor(init?:Partial<Alias>) {
    Object.assign(this, init)
  }

  @PrimaryColumn('char', {
    length: 42
  })
  address: string

  @Column({
    length: 255,
  })
  alias: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()  
  updatedAt: Date
}
