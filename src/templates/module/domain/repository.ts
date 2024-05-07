import { Scaffold, ScaffoldPayload } from "./model";

export default interface ScaffoldRepository {
  findAll(): Promise<Scaffold[]>;
  findById(id: string): Promise<Scaffold>;
  create(payload: ScaffoldPayload): Promise<Scaffold>;
  update(id: string, payload: ScaffoldPayload): Promise<Scaffold>;
  delete(id: string): Promise<void>;
}