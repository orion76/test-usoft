export interface IEnvironmentConfig {
  api_key?: string;
}

export interface IQueryResultRecordCellObjectAddress {
  is_deleted: number;
  Address: string;
}


export interface IQueryResultRecordCells {
  FullName: string;
  ObjectAddress: IQueryResultRecordCellObjectAddress[]
}

export interface IQueryResultRecord {
  global_id: number,
  Number: number,
  Cells: IQueryResultRecordCells,

}



export interface IDatasetRecord {
  id: string;
  n: string;
  name: string;
  address: string;
}
export type TApiQuery = Record<string, string | number | boolean | ReadonlyArray<string | number | boolean>>