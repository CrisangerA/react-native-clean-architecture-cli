import { Scaffold, ScaffoldPayload } from "./model";

export default interface ScaffoldRepository {
  findAll(): Promise<Scaffold[] | Error>;
  findById(id: string): Promise<Scaffold | Error>;
  create(payload: ScaffoldPayload): Promise<Scaffold | Error>;
  update(id: string, payload: ScaffoldPayload): Promise<Scaffold | Error>;
  remove (id: string): Promise<boolean | Error>;
}