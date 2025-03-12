import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { API_KEY } from '../app.config';
import { IDatasetRecord, IQueryResultRecord, TApiQuery } from '../types/common';
import { LibraryDataAccessObject } from '../utils/library-data-access-object';
import { queryResult } from './data';

function dataObjectFactory(highlightText: string): (data: IQueryResultRecord) => IDatasetRecord {
  return (data: IQueryResultRecord) => new LibraryDataAccessObject(data, highlightText);
}


@Injectable({
  providedIn: 'root'
})
export class DataService {
  DEBUG = false;
  private DATA_SET_ID = '526'; // Библиотеки
  private SEARCH_FIELD = 'FullName'

  private apiUrl = 'https://apidata.mos.ru/v1';
  private apiKey = inject(API_KEY);

  private http = inject(HttpClient)

  search(searchValue: string, $skip?: number) {
    const searchParam = `Cells/${this.SEARCH_FIELD} eq '${searchValue}'`;

    const params: TApiQuery = { $filter: searchParam }
    if ($skip) {
      params['$skip'] = String($skip)
    }

    // return of(queryResult.slice(0,10).map(dataObjectFactory))
    return this._query<IQueryResultRecord[]>(['datasets', this.DATA_SET_ID, 'rows'], params).pipe(
      map((result: IQueryResultRecord[]) => result.map(dataObjectFactory(searchValue))));
  }

  private _query<T>(source: string[], params: TApiQuery = {}): Observable<T> {
    if (!params['api_key']) {
      params['api_key'] = this.apiKey;
    }

    this.debug('query', source, params)

    return this.http.get(`${[this.apiUrl, ...source].join('/')}`, { params }) as Observable<T>
  }

  private debug(...vars: any[]) {
    if (!this.DEBUG) {
      return;
    }
    console.log('[DEBUG] DataService', ...vars)
  }
}
