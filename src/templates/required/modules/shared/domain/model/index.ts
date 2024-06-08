export interface Timestamp {
  nanoseconds: number;
  seconds: number;
}

export interface Item {
  label: string;
  value: string;
  subLabel?: string;
}
