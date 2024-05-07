import { Scaffold, ScaffoldPayload } from "../domain/model";
import ScaffoldRepository from "../domain/repository";

export default class FirebaseRepository implements ScaffoldRepository {
  findAll(): Promise<Scaffold[]> {
    throw new Error("Method not implemented.");
  }
  findById(id: string): Promise<Scaffold> {
    throw new Error("Method not implemented.");
  }
  create(payload: ScaffoldPayload): Promise<Scaffold> {
    throw new Error("Method not implemented.");
  }
  update(id: string, payload: ScaffoldPayload): Promise<Scaffold> {
    throw new Error("Method not implemented.");
  }
  delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}