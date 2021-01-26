import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {
  IColumn,
  IRemoteTableQueryParams,
} from '../enhanced-zorro-table.model';
import { NzTableFilterList } from 'ng-zorro-antd/table';
import {
  DFSchemaField,
  DynamicFormComponent,
} from '../dynamic-form/dynamic-form.component';

interface ITrp {
  filter: Array<{ key: string; value: any | any[] }>;
  search: Record<string, any>;
}

@Component({
  selector: 'enhanced-table-query-param',
  templateUrl: './table-query-param.component.html',
  styleUrls: ['./table-query-param.component.less'],
})
export class TableQueryParamComponent<T> implements OnChanges, OnInit {
  @Input() queryParam!: IRemoteTableQueryParams;
  @Input() columns: IColumn<T>[] = [];
  @Output() queryParamChange = new EventEmitter();
  @ViewChild(DynamicFormComponent) dForm!: DynamicFormComponent;
  schema: DFSchemaField[] = [];

  private filterFields: string[] = [];

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.queryParam && changes.queryParam.firstChange) {
      this.queryParamChange.emit(changes.queryParam.currentValue);
    }
  }

  ngOnInit(): void {
    this.schema = this.initSchema();
    this.filterFields = this.columns.reduce<string[]>(
      (prev, { useFilter, column }) => {
        if (!!useFilter) {
          if (!column) {
            throw Error('useFilter must appear with column');
          }
          return [...prev, column];
        }
        return prev;
      },
      [],
    );
  }

  onSearchChange(val: any): void {
    // split filter and search
    this.queryParamChange.emit(this.splitFilterAndSearch(val));
  }

  onSearch(): void {
    this.queryParamChange.emit(
      // tslint:disable-next-line:no-non-null-assertion
      this.splitFilterAndSearch(this.dForm!.form!.value),
    );
  }

  onReset(): void {
    // tslint:disable-next-line:no-non-null-assertion
    this.dForm!.resetVal();
  }

  private initSchema(): DFSchemaField[] {
    return this.columns.reduce<DFSchemaField[]>(
      (
        prev,
        {
          useSearch,
          searchType,
          useFilter,
          filterOptions,
          filterMultiple,
          label,
          column,
        },
      ) => {
        if (!!column) {
          const field: DFSchemaField = {
            label,
            column,
            typing: 'text',
          };
          field.default =
            this.queryParam.search[field.column] ||
            this.queryParam.filter.find((i) => i.key === field.column)?.value;
          if (useSearch) {
            field.typing = searchType || 'text';
          } else if (useFilter) {
            field.options = filterOptions as NzTableFilterList;
            field.typing = filterMultiple ? 'multi-select' : 'select';
          } else {
            return prev;
          }
          return [...prev, field];
        } else {
          return prev;
        }
      },
      [],
    );
  }

  private splitFilterAndSearch(
    val: Record<string, any>,
  ): {
    filter: Array<{ key: string; value: any | any[] }>;
    search: Record<string, any>;
  } {
    return Object.entries(val).reduce<ITrp>(
      (prev, [k, v]) => {
        if (this.filterFields.includes(k)) {
          return {
            ...prev,
            filter: [...prev.filter, { key: k, value: v }],
          };
        }
        return {
          ...prev,
          search: {
            ...prev.search,
            [k]: v,
          },
        };
      },
      { filter: [], search: {} },
    );
  }
}
