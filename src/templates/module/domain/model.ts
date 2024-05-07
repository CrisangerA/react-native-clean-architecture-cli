export interface Scaffold {
  id: string;
  name: string;
}

export interface ScaffoldPayload extends Omit<Scaffold, 'id'> {}