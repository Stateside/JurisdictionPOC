import { IRevisionParameter, ParamType } from "db/interfaces/IRevisionParameter"
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Relation } from "typeorm"
import { Revision } from "./Revision"

@Entity()
export class RevisionParameter implements IRevisionParameter {
  constructor(init?:Partial<RevisionParameter>) {
    Object.assign(this, init)
  }

  @PrimaryGeneratedColumn()
  id: number

  @Column({
    length: 255
  })
  name: string

  @Column({
    type: "enum",
    enum: ParamType
  })
  type: ParamType

  @Column({
    length: 1024
  })
  value: string

  @Column({
    length: 1024
  })
  hint: string

  @ManyToOne(() => Revision, (revision) => revision.parameters, {
    onDelete: "CASCADE",
    orphanedRowAction: "delete"
  })
  revision: Relation<Revision>
}
