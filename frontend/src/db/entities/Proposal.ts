import { IProposal } from "db/interfaces/IProposal"
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, Relation, UpdateDateColumn } from "typeorm"
import { Revision } from "./Revision"

@Entity()
export class Proposal implements IProposal {
  constructor(init?:Partial<Proposal>) {
    Object.assign(this, init)
  }

  @PrimaryColumn('char', {
    length: 66
  })
  id: string

  @PrimaryColumn('int')
  chainId: number

  @Column('int')
  startBlock: number

  @Column('int')
  deadline: number

  @Column('char', {
    length: 42
  })
  proposer: string

  @Column('int')
  version: number

  @Column({
    length: 255,
    nullable: true
  })
  description: string

  @Column('char', {
    length: 42
  })
  governor: string

  @OneToMany(() => Revision, (revision) => revision.proposal, {
      cascade: true,
      eager: true
  })
  revisions: Relation<Revision>[]

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()  
  updatedAt: Date
}
