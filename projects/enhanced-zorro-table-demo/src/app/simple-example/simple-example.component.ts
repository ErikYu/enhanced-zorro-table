import { Component, OnInit } from '@angular/core';
import { IColumn } from '../../../../enhanced-zorro-table/src/lib/enhanced-zorro-table.model';

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
  selector: 'app-simple-example',
  templateUrl: './simple-example.component.html',
  styleUrls: ['./simple-example.component.less'],
})
export class SimpleExampleComponent implements OnInit {
  constructor() {}
  columns: IColumn<IHero>[] = [
    { label: 'Name', propFn: (row) => row.name },
    { label: 'Age', propFn: (row) => row.age.toString() },
    { label: 'Class', propFn: (row) => row.wowClass },
    { label: 'Gender', propFn: (row) => GenderDesc.get(row.gender) },
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

  codeHtml = `<enhanced-zorro-table
  style="width: 500px"
  [columns]="columns"
  [rows]="rows"
  [total]="total"
></enhanced-zorro-table>`;

  codeTs = `import { Component, OnInit } from '@angular/core';
import { IColumn } from 'enhanced-zorro-table';

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
  selector: 'app-simple-example',
  templateUrl: './simple-example.component.html',
  styleUrls: ['./simple-example.component.less'],
})
export class SimpleExampleComponent implements OnInit {
  constructor() {}
  columns: IColumn<IHero>[] = [
    { label: 'Name', propFn: (row) => row.name },
    { label: 'Age', propFn: (row) => row.age.toString() },
    { label: 'Class', propFn: (row) => row.wowClass },
    { label: 'Gender', propFn: (row) => GenderDesc.get(row.gender) },
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

  ngOnInit(): void {}
}
`;

  ngOnInit(): void {}
}
