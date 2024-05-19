import ScaffoldRepository from "../domain/repository";
import { Scaffold, ScaffoldPayload } from "../domain/model";

export default class LocalRepository implements ScaffoldRepository {
  findAll(): Promise<Scaffold[] | Error> {
    throw new Error("Method not implemented.");
  }
  findById(id: string): Promise<Scaffold | Error> {
    throw new Error("Method not implemented.");
  }
  create(payload: ScaffoldPayload): Promise<Scaffold | Error> {
    throw new Error("Method not implemented.");
  }
  update(id: string, payload: ScaffoldPayload): Promise<Scaffold | Error> {
    throw new Error("Method not implemented.");
  }
  remove(id: string): Promise<boolean | Error> {
    throw new Error("Method not implemented.");
  }
}