import { IDatasetRecord, IQueryResultRecord } from "../types/common";




export class LibraryDataAccessObject implements IDatasetRecord {
  private EMPTY_ADDRESS = 'Address is missing'



  constructor(private _origin: IQueryResultRecord, private _highlightText: string) {
  }

  get id() {
    return String(this._origin.global_id);
  }
  get n(): string {
    return String(this._origin.Number);
  };

  get name(): string {
    return this._origin.Cells.FullName;
  };
  get address(): string {
    return this._origin.Cells.ObjectAddress.find((rec) => !rec.is_deleted)?.Address || this.EMPTY_ADDRESS;
  };
}
