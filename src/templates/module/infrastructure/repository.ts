import FirebaseRepository from "./firebase.repository";

function createScaffoldService() {
  return new FirebaseRepository();
}

export default createScaffoldService();
