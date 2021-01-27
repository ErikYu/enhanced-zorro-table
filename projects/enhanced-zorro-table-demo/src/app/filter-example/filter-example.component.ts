import { Component, OnInit } from '@angular/core';
import {
  IColumn,
  IRemoteTableQueryParams,
} from '../../../../enhanced-zorro-table/src/lib/enhanced-zorro-table.model';
import { DatePipe } from '@angular/common';
import { DataMockerService, IHero } from '../service/data-mocker.service';
import { startWith } from 'rxjs/operators';

const GenderDesc = new Map([
  ['f', 'Female'],
  ['m', 'Male'],
]);
@Component({
  selector: 'app-filter-example',
  templateUrl: './filter-example.component.html',
  styleUrls: ['./filter-example.component.less'],
})
export class FilterExampleComponent implements OnInit {
  columns: IColumn<IHero>[] = [
    {
      label: 'Name',
      propFn: (row) => row.name,
      column: 'name',
      useSearch: true,
    },
    { label: 'Age', propFn: (row) => row.age.toString(), useSort: true },
    { label: 'Class', propFn: (row) => row.wowClass },
    {
      label: 'Gender',
      propFn: (row) => GenderDesc.get(row.gender),
      column: 'gender',
      useFilter: true,
      filterOptions: [
        { text: 'Female', value: 'f' },
        { text: 'Male', value: 'm' },
      ],
    },
    {
      label: 'Joined At',
      propFn: (row) => new DatePipe('en_US').transform(row.joinedAt),
      column: 'joinedAt',
    },
  ];
  rows: IHero[] = [];
  total = 0;
  loading = false;

  constructor(private dataMockerService: DataMockerService) {}

  ngOnInit(): void {}

  queryParamChange(evt: IRemoteTableQueryParams): void {
    this.loading = true;
    this.dataMockerService
      .getPaginatedHeroes(evt)
      .subscribe(({ data, total }) => {
        this.rows = data;
        this.total = total;
        this.loading = false;
      });
  }
}
