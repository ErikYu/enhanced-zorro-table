import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  ViewChildren,
} from '@angular/core';
import {
  IColumn,
  IRemoteTableQueryParams,
  IStaticColumn,
} from './enhanced-zorro-table.model';
import { NzTableQueryParams, NzTableSortOrder } from 'ng-zorro-antd/table';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NzDropdownMenuComponent } from 'ng-zorro-antd/dropdown';
import { isObservable } from 'rxjs';
import { EnhancedZorroTableService } from './enhanced-zorro-table.service';

const DF_PAGE_SIZE = 10;

type searchPos = 'form' | 'header';

@Component({
  selector: 'enhanced-zorro-table',
  templateUrl: './enhanced-zorro-table.component.html',
  styleUrls: ['./enhanced-zorro-table.component.less'],
  providers: [EnhancedZorroTableService],
})
export class EnhancedZorroTableComponent<T = any>
  implements OnInit, AfterViewInit {
  @Input() scrollAt: {
    x?: string | null;
    y?: string | null;
  } = {};
  @Input() searchPos: searchPos = 'form';
  @Input() useIndex = false;

  // column def
  @Input() columns: IColumn<T>[] = [];
  // tslint:disable-next-line:variable-name
  _columns: IStaticColumn<T>[] = [];

  // data rows
  @Input() rows: T[] = [];

  // default param
  defaultQueryParam: IRemoteTableQueryParams = {
    pageIndex: 1,
    pageSize: DF_PAGE_SIZE,
    sort: [],
    filter: [],
    search: {},
  };
  @Input()
  set queryParam(val: Partial<IRemoteTableQueryParams>) {
    this.defaultQueryParam = {
      pageIndex: 1,
      pageSize: DF_PAGE_SIZE,
      sort: [],
      filter: [],
      search: {},
      ...val,
    };
  }
  @Output() queryParamChange = new EventEmitter<IRemoteTableQueryParams>();

  // 自定义搜索框组件列表
  @ViewChildren('allMenus', { read: NzDropdownMenuComponent })
  dropdowns!: QueryList<NzDropdownMenuComponent>;

  // 自定义搜索框组件与字段名映射
  propDropdownMap!: Map<string, NzDropdownMenuComponent>;

  // dropdownVisible s
  dropdownVisibleMap!: Record<string, boolean>;

  // 排序值与字段名映射
  propSortMap!: Map<string, NzTableSortOrder>;

  @Input() total = 0;

  customizedSearchForm!: FormGroup;
  customizedSearchProps!: string[];

  constructor(
    private fb: FormBuilder,
    public remoteTableService: EnhancedZorroTableService,
  ) {}

  async ngOnInit(): Promise<void> {
    this.remoteTableService.listen().subscribe((res) => {
      this.queryParamChange.emit(res);
    });
    this.propSortMap = new Map<string, NzTableSortOrder>(
      this.defaultQueryParam.sort.map(({ key, value }) => [key, value]),
    );

    const propFilterMap = new Map<string, any>(
      this.defaultQueryParam.filter.map(({ key, value }) => [key, value]),
    );

    const controlConfig = this.columns.reduce<{
      conf: { [key: string]: any };
      searchProps: string[];
    }>(
      (prev, item) => {
        const { conf: prevConf, searchProps: prevSearchProps } = prev;
        if (item.useSearch) {
          if (!item.column) {
            throw Error(`Column ${item.label} is using useSearch, must implement "column" prop`);
          }
          return {
            conf: {
              ...prevConf,
              [item.column]: [this.defaultQueryParam.search[item.column]],
            },
            searchProps: [...prevSearchProps, item.column],
          };
        }
        return prev;
      },
      { conf: {}, searchProps: [] },
    );
    this.customizedSearchForm = this.fb.group(controlConfig.conf);
    this.customizedSearchProps = controlConfig.searchProps;

    // tslint:disable-next-line:variable-name
    const _columns: IStaticColumn[] = [];
    for (const c of this.columns) {
      if (Array.isArray(c.filterOptions)) {
        _columns.push({
          ...c,
          filterOptions: c.filterOptions.map((option) => {
            if (
              this.isOrIsIn(`${option.value}`, propFilterMap.get(c.column!))
            ) {
              return {
                ...option,
                byDefault: true,
              };
            }
            return option;
          }),
        });
      } else if (isObservable(c.filterOptions)) {
        const options = await c.filterOptions.toPromise();
        _columns.push({
          ...c,
          filterOptions: options.map((option) => {
            if (
              this.isOrIsIn(`${option.value}`, propFilterMap.get(c.column!))
            ) {
              return {
                ...option,
                byDefault: true,
              };
            }
            return option;
          }),
        });
      } else {
        _columns.push(c as IStaticColumn);
      }
    }
    this._columns = _columns;
  }

  private isOrIsIn(item: string, container: string | string[]): boolean {
    const tmpContainer = Array.isArray(container) ? container : [container];
    return tmpContainer.includes(item);
  }

  ngAfterViewInit(): void {
    Promise.resolve().then(() => {
      this.propDropdownMap = new Map<string, NzDropdownMenuComponent>();
      this.dropdownVisibleMap = {};
      this.dropdowns.toArray().map((item) => {
        const id = item.viewContainerRef.element.nativeElement.id;
        this.propDropdownMap.set(id, item);
        this.dropdownVisibleMap[id] = false;
      });
    });
  }

  // nz-table表头筛选变更触发
  onQueryParamChange(evt: NzTableQueryParams): void {
    if (this.searchPos === 'header') {
      this.remoteTableService.changeSort({ sort: evt.sort });
      this.remoteTableService.changeFilter({
        filter: evt.filter,
      });
      this.remoteTableService.changeSearch({
        search: this.customizedSearchForm.value,
      });
      this.remoteTableService.changePage({
        pageIndex: evt.pageIndex,
        pageSize: evt.pageSize,
      });
    } else if (this.searchPos === 'form') {
      // 使用form搜索时，由于sort信息仍在nz-table的header上
      // 因此，仍要将sort数据传输出去
      this.remoteTableService.changePage({
        pageIndex: evt.pageIndex,
        pageSize: evt.pageSize,
      });
      this.remoteTableService.changeSort({ sort: evt.sort });
    }
  }

  // 自定义搜索表单变更触发
  paramFormChange(evt: any): void {
    if (this.searchPos === 'form') {
      this.remoteTableService.changeFilter({
        filter: evt.filter,
      });
      this.remoteTableService.changeSearch({
        search: evt.search,
      });
    }
  }

  onSearch(searchProp: string): void {
    this.remoteTableService.changeFilter({
      filter: this.defaultQueryParam.filter,
    });
    this.remoteTableService.changeSearch({
      search: this.customizedSearchForm.value,
    });
    this.dropdownVisibleMap[searchProp] = false;
  }

  onReset(searchProp: string): void {
    this.customizedSearchForm.patchValue({
      [searchProp]: null,
    });
    this.remoteTableService.changeFilter({
      filter: this.defaultQueryParam.filter,
    });
    this.remoteTableService.changeSearch({
      search: this.customizedSearchForm.value,
    });
    this.dropdownVisibleMap[searchProp] = false;
  }

  dropDownVisibleChange(evt: boolean, searchProp: string): void {
    Promise.resolve().then(() => {
      if (evt) {
        document.getElementById(`dropdown-input-${searchProp}`)!.focus();
      }
    });
  }
}
