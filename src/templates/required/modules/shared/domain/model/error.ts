export class InfrastuctureLayerError extends Error {
  constructor(message: string, name?: string) {
    super(message);
    this.stack = 'InfrastuctureLayerError';
    this.name = name ?? 'Error en el servicio';
  }
}

export class ApplicationLayerError extends Error {
  constructor(message: string, name?: string) {
    super(message);
    this.stack = 'ApplicationLayerError';
    this.name = name || 'Error en la aplicación';
  }
}

export class DomainLayerError extends Error {
  constructor(message: string, name?: string) {
    super(message);
    this.stack = 'DomainLayerError';
    this.name = name || 'Error interno';
  }
}

export class AppError extends Error {
  constructor(message: string, name?: string) {
    super(message);
    //this.stack = 'ApplicationLayerError';
    this.name = name || 'App error';
  }
}
