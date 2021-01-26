import { NzButtonSize, NzButtonType } from 'ng-zorro-antd/button';
import { NzTableFilterList, NzTableQueryParams } from 'ng-zorro-antd/table';
import { Observable } from 'rxjs';
import { NzPresetColor } from 'ng-zorro-antd/core/color';

// interface IColumnBase<T> {
//   label: string;
//   propFn: (row: T) => string;
//   onClick?: (arg: T) => void;
//
//   // 固定左、右
//   pinLeft?: boolean;
//   pinRight?: boolean;
//   width?: string | null;
//
//   tagged?: (arg: T) => NzPresetColor;
// }
// interface IOnlyColumn<T> extends IColumnBase<T>{}
//
// interface ISearchableColumn<T> extends IColumnBase<T>{
//   column: string;
//   useSearch: boolean;
//   searchType: 'text' | 'date-range';
// }
//
// interface ISortableColumn<T> extends IColumnBase<T> {
//   column: string;
//   useSort: boolean;
// }
//
// interface IFilterableColumn<T> extends IColumnBase<T> {
//   column: string;
//   useFilter: boolean;
//   filterOptions: NzTableFilterList | Observable<NzTableFilterList>;
//   filterMultiple: boolean;
// }
//
// interface IActionColumn<T> extends IColumnBase<T> {
//   useAction: boolean;
//   actions: Array<{
//     btnLabel?: string;
//     btnType?: NzButtonType;
//     btnSize?: NzButtonSize;
//     btnIcon?;
//     onClick?: (arg: T) => void;
//     btnAuth?: string;
//   }>;
// }
//
// export type IColumn<T = any> = IOnlyColumn<T> | ISearchableColumn<T> | ISortableColumn<T> | IFilterableColumn<T> | IActionColumn<T>;

export interface IColumn<T> {
  label: string;
  propFn: (row: T) => string;
  column?: string; // query param 字段名

  useSort?: boolean;

  useFilter?: boolean; // 下拉筛选
  filterOptions?: NzTableFilterList | Observable<NzTableFilterList>;
  filterMultiple?: boolean;

  useSearch?: boolean; // 输入框筛选
  searchType?: 'text' | 'date-range';

  useAction?: boolean;
  actions?: Array<{
    btnLabel?: string;
    btnType?: NzButtonType;
    btnSize?: NzButtonSize;
    btnIcon?: string;
    onClick?: (arg: T) => void;
    btnAuth?: string;
  }>;

  onClick?: (arg: T) => void;

  // 固定左、右
  pinLeft?: boolean;
  pinRight?: boolean;
  width?: string | null;

  tagged?: (arg: T) => NzPresetColor;
}

export interface IStaticColumn<T = any> extends IColumn<T> {
  filterOptions?: NzTableFilterList;
}

export interface IRemoteTableQueryParams extends NzTableQueryParams {
  search?: any;
}
