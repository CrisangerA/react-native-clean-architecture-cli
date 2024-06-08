import { InfrastructureType } from "../types"

export const configuration = {
  name: 'rnca',
  version: '1.0.9',
  description: '✨ React Native Clean Architecture CLI ✨\n🛠️ CLI para crear el boilerplate de un proyecto en React Native ⚛️ con Clean Architecture.\n📂 Incluye carpetas de dominio, aplicacion e infraestructura.'
}

export const SERVICE_BY_INFRA = {
  [InfrastructureType.axios]: 'axios.repository.ts',
  [InfrastructureType.fetch]: 'fetch.repository.ts',
  [InfrastructureType.firebase]: 'firebase.repository.ts',
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

export const INITIAL_SCAFFOLD_FILES = [
  // @config
  'config/constants.ts',
  'config/api.routes.ts',
  'config/local.storage.ts',
  // @shared
  'modules/shared/application/alert.ts',
  'modules/shared/application/analytics.ts',
  'modules/shared/application/error.ts',
  'modules/shared/application/zustand.ts',
  'modules/shared/application/hooks/index.ts',
  'modules/shared/application/hooks/useSearchbar.ts',

  'modules/shared/domain/model/error.ts',
  'modules/shared/domain/model/index.ts',
  'modules/shared/domain/utils/index.ts',
  'modules/shared/domain/utils/array.ts',
  'modules/shared/domain/adapter.ts',
  'modules/shared/domain/regExp.ts',

  //'modules/shared/infrastructure/local/local.repository.ts',
  'modules/shared/infrastructure/axios.service.ts',
  'modules/shared/infrastructure/fetch.service.ts',

  // @theme
  'theme/colors.ts',
  'theme/common.ts',
  'theme/fonts.ts',
  'theme/index.ts',
  'theme/responsive.ts',
];