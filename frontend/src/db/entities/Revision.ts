import { IRevision } from "db/interfaces/IRevision"
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Relation } from "typeorm"
import { Proposal } from "./Proposal"
import { RevisionParameter } from "./RevisionParameter"

@Entity()
export class Revision implements IRevision {
  constructor(init?:Partial<Revision>) {
    Object.assign(this, init)
  }

  @PrimaryGeneratedColumn()
  id: number

  @Column('char', {
    length: 42,
  })
  target: string

  @Column({
    length: 255
  })
  name: string

  @Column({
    length: 1024
  })
  description: string

  @Column({
    length: 4096
  })
  pdata: string

  @OneToMany(() => RevisionParameter, (param) => param.revision, {
    cascade: true,
    eager: true
  })
  parameters: Relation<RevisionParameter>[]

  @ManyToOne(() => Proposal, (proposal) => proposal.revisions, {
    onDelete: "CASCADE",
    orphanedRowAction: "delete"
  })
  proposal: Relation<Proposal>
}
