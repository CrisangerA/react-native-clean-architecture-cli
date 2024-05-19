import { InfrastructureType } from "../types"

export const configuration = {
  name: 'rnca',
  version: '0.0.1',
  description: '✨ React Native Clean Architecture CLI ✨\n🛠️ CLI para crear el boilerplate de un proyecto en React Native ⚛️ con Clean Architecture. 📂 Incluye carpetas de dominio, aplicacion e infraestructura.'
}

export const SERVICE_BY_INFRA = {
  [InfrastructureType.firebase]: 'firebase.repository.ts',
  [InfrastructureType.postgre]: 'postgre.repository.ts',
  [InfrastructureType.local]: 'local.repository.ts',
};

export const MODULE_SCAFFOLD_FILES = [
  'app/queries.ts',
  'app/mutations.ts',
  'domain/model.ts',
  'domain/repository.ts',
  'infrastructure/repository.ts',
];

export const CRUD_SCAFFOLD_FILES = [
  'Form.tsx',
  'Detail.tsx',
  'ListView.tsx',
  'components/Form.tsx',
  'components/ListView.tsx',
  'components/ItemListView.tsx',
];
