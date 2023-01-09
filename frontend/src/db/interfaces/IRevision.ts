import { ParamType } from "@/utils/types"
import { IRevisionParameter } from "./IRevisionParameter"

export { ParamType } from "@/utils/types"

export interface IRevision {
  id: number
  target: string
  name: string
  description: string
  pdata: string
  parameters: IRevisionParameter[]
}
