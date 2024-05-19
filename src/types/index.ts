export enum InfrastructureType {
  firebase = 'firebase',
  fetch = 'fetch',
  axios = 'axios',
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