import { Injectable } from '@angular/core';
import { combineLatest, merge, Observable, Subject } from 'rxjs';
import { NzTableQueryParams, NzTableSortOrder } from 'ng-zorro-antd/table';
import { debounceTime, map, mergeAll } from 'rxjs/operators';

type ISorts = {
  sort: NzTableQueryParams['sort'];
};
type IFilters = Pick<NzTableQueryParams, 'filter'>;
type ISearch = {
  search: { [kwy: string]: any };
};
type IPage = {
  pageIndex: number;
  pageSize: number;
};

@Injectable()
export class EnhancedZorroTableService {
  private sortListener = new Subject<ISorts>();
  private filterListener = new Subject<IFilters>();
  private searchListener = new Subject<ISearch>();
  private pageListener = new Subject<IPage>();

  changeSort(sort: ISorts): void {
    this.sortListener.next(sort);
  }

  changeFilter(filters: IFilters): void {
    this.filterListener.next(filters);
  }

  changeSearch(search: ISearch): void {
    this.searchListener.next(search);
  }

  changePage(page: IPage): void {
    this.pageListener.next(page);
  }

  listen(): Observable<any> {
    return combineLatest([
      this.sortListener,
      this.filterListener,
      this.searchListener,
      this.pageListener,
    ]).pipe(
      map(([f, s, t, p]) => ({
        ...f,
        ...s,
        ...t,
        ...p,
      })),
      debounceTime(0),
    );
  }
}
