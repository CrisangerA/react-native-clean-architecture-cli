import ScaffoldRepository from "../domain/repository";
import FirebaseRepository from "./firebase.repository";

function createScaffoldService(): ScaffoldRepository {
  return new FirebaseRepository();
}

export default createScaffoldService();
