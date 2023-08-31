export interface IAListRes {
  count: number;
  next?: string;
  previous?: string;
  results: Array<unknown>;
}

export interface IRsFile {
  name: string;
  lastModified: number;
  lastModifiedDate: Date;
  size: number;
  type: string;
}
