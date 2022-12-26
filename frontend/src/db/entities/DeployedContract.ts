import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

@Entity("deployed_contracts")
export class DeployedContract {
  constructor(init?:Partial<DeployedContract>) {
    Object.assign(this, init)
  }

  @PrimaryGeneratedColumn()
  id: number

  @Column({
    length: 255,
  })
  name: string

  @Column({
    length: 10,
  })
  version: string

  @Column({
    length: 128,
  })
  interface: string

  @Column('char', {
    length: 42,
  })
  address: string

  @Column({
    length: 255,
    nullable: true
  })
  description: string

  @Column('int')
  chainId: number

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()  
  updatedAt: Date
}
