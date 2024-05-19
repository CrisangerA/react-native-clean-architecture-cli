import ScaffoldRepository from "../domain/repository";
import { Scaffold, ScaffoldPayload } from "../domain/model";
// Shared
import { manageAppErrors } from '../../../utils/error';
import FetchService from "../../../utils/fetch.service";
import { API_ROUTES } from '../../../utils/api.routes';

// -----------------------------------------------------------------------------------------
export default class FetchRepository extends FetchService implements ScaffoldRepository {
  constructor() {
    super(API_ROUTES.ROOT + API_ROUTES.SCAFFOLD);
  }

  async findAll(): Promise<Scaffold[] | Error> {
    try {
      return this.get<Scaffold[]>();
    } catch (e) {
      return manageAppErrors(e, 'scaffold_find_all');
    }
  }

  async findById(id: string): Promise<Scaffold | Error> {
    try {
      return this.get<Scaffold>(id);
    } catch (e) {
      return manageAppErrors(e, `scaffold_find_by_id_${id}`);
    }
  }

  async create(payload: ScaffoldPayload): Promise<Scaffold | Error> {
    try {
      return this.post<Scaffold>(payload);
    } catch (e) {
      return manageAppErrors(e, 'scaffold_create');
    }
  }

  async update(id: string, payload: ScaffoldPayload): Promise<Scaffold | Error> {
    try {
      return this.put<Scaffold>(id, payload);
    } catch (e) {
      return manageAppErrors(e, `scaffold_update_${id}`);
    }
  }

  async remove(id: string): Promise<boolean | Error> {
    try {
      return this.delete(id);
    } catch (e) {
      return manageAppErrors(e, `scaffold_remove_${id}`);
    }
  }
}


new FetchRepository().setAuthToken('token');