import { Component, computed, inject, signal, ViewEncapsulation } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { catchError, combineLatestWith, filter, map, Observable, of, switchMap, tap } from 'rxjs';
import { HighlightTextDirective } from '../../directives/highlight-text.directive';
import { DataService } from '../../services/data.service';
import { LoadingService } from '../../services/loader/loader.service';
import { IDatasetRecord } from '../../types';
import { LibraryViewComponent } from '../library-view/library-view.component';
import { PaginatorComponent } from '../paginator/paginator.component';
import { LibrarySearchFormComponent } from './library-search-form.component';


@Component({
  selector: 'app-library-list',
  imports: [
    FormsModule,
    LibrarySearchFormComponent,
    LibraryViewComponent,
    HighlightTextDirective,
    PaginatorComponent

  ],
  template: `
  <app-library-search-form [(searchText)]="searchText"></app-library-search-form>
  <div class="search-result">
    <div class="total">
      <div>Найдено {{totalItems()}} библиотек</div>
    </div>  
  <list-paginator [(currentPage)]="currentPage" [pagesCount]="pagesCount()"></list-paginator>
      <table class="library-list">
        <thead class="table-head">
            <tr class="table-row table-header-row">
              @for(column of COLUMNS; track $index){
                <th class="table-cell">{{column}} </th>
              }
            </tr>
        </thead>
        <tbody class="table-body">
          @for (rowData of data(); track rowData.n) {
            <tr class="table-row" (click)="showDetails(rowData)"> 
              <td class="table-cell">{{rowData.n}} </td>
              <td class="table-cell" [highlightContent]="rowData.name" [highlightText]="highlightText()" ></td>
              <td class="table-cell">{{rowData.address}}</td>
            </tr>
          }@empty {
            <tr class="table-row">
                <td class="table-cell table-empty-message" colspan="3">{{TABLE_EMPTY_MESSAGE}}</td>
            </tr>
          }
        </tbody>
    </table>
    <list-paginator [(currentPage)]="currentPage" [pagesCount]="pagesCount()"></list-paginator>
  </div>
  <app-library-view [(data)]="detailsData"></app-library-view>
  `,
  styleUrl: 'library-list.component.scss',
  host: { 'class': 'app-library-list' },
  standalone: true,
  encapsulation: ViewEncapsulation.None
})
export class LibraryListComponent {

  public COLUMNS: string[] = ['№', 'Наименование', 'Адрес'];
  public TABLE_EMPTY_MESSAGE = 'Библиотеки не найдены.';
  private ITEMS_PER_PAGE = 10;

  private dataService = inject(DataService);
  loader = inject(LoadingService);

  totalItems = signal<number>(0);
  pagesCount = computed(() => Math.ceil(this.totalItems() / this.ITEMS_PER_PAGE))

  searchText = signal<string>('')
  highlightText = signal<string>('')
  currentPage = signal<number>(1)

  currentPage$ = toObservable(this.currentPage);

  data$: Observable<IDatasetRecord[]> = toObservable(this.searchText).pipe(
    // filter(Boolean),
    tap(() => this.loader.loadingOn()),
    switchMap((text) => this.dataService.search(text)),
    tap((data) => {
      this.totalItems.set(data.length);
      this.currentPage.set(1);
    }),
    combineLatestWith(this.currentPage$),
    map<any, IDatasetRecord[]>(([data, pageNumber]) => {
      const _pageNumber = pageNumber > 0 ? pageNumber - 1 : 0;
      const start = _pageNumber * this.ITEMS_PER_PAGE;

      return data.slice(start, start + this.ITEMS_PER_PAGE) as IDatasetRecord[]
    }),
    catchError(() => of([])),
    tap((d) => {
      this.highlightText.set(this.searchText());
      this.loader.loadingOff();
    }),
  ) as Observable<IDatasetRecord[]>;

  data = toSignal(this.data$)

  detailsData = signal<Record<string, string> | undefined>(undefined);

  setSearchText(searchText: string) {
    this.searchText.set(searchText);
  }

  showDetails(details: IDatasetRecord) {
    this.detailsData.set(details as unknown as Record<string, string>);
  }
}
