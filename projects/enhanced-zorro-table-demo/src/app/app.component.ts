import { Component } from '@angular/core';
import { IRemoteTableQueryParams } from '../../../enhanced-zorro-table/src/lib/enhanced-zorro-table.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent {
  columns = [
    {
      label: '姓名',
      propFn: (row) => row.name,
      column: 'name',
      useSearch: true,
    },
    { label: '年龄', propFn: (row) => row.age, column: 'age', useSort: true },
  ];

  rows = [];
  total = 12;
  queryParamChange(evt: IRemoteTableQueryParams): void {
    console.log(evt);
  }
}
