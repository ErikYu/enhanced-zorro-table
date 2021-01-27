import { Component, OnInit } from '@angular/core';
import {IColumn, IRemoteTableQueryParams} from '../../../../enhanced-zorro-table/src/lib/enhanced-zorro-table.model';
interface IHero {
  name: string;
  age: number;
  gender: 'f' | 'm';
  race: string;
  wowClass: string;
}

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
    { label: 'Name', propFn: (row) => row.name, column: 'name', useSearch: true },
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
  ];
  rows: IHero[] = [
    { name: 'Thrall', age: 34, race: 'orc', wowClass: 'Shaman', gender: 'm' },
    {
      name: 'Anduin Wrynn',
      age: 24,
      race: 'human',
      wowClass: 'Priest',
      gender: 'm',
    },
    {
      name: 'Arthas Menethil',
      age: 45,
      race: 'human',
      wowClass: 'Death knight',
      gender: 'm',
    },
    {
      name: 'Sylvanas Windrunner',
      age: 34,
      race: 'undead',
      wowClass: 'Ranger',
      gender: 'f',
    },
  ];
  total = 12;

  constructor() {}

  ngOnInit(): void {}

  queryParamChange(evt: IRemoteTableQueryParams): void {
    console.log(evt);
  }
}
