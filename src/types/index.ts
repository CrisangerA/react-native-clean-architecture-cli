export enum InfrastructureType {
  firebase = 'firebase',
  postgre = 'postgre',
  local = 'local'
}

enum NavigationType {
  stack = 'stack',
  bottomTab = 'bottomTab',
  drawer = 'drawer'
}

export interface ModuleOptions {
  infra: InfrastructureType;
  nav: NavigationType;
}