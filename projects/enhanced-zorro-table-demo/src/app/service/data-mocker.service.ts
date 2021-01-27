import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { IRemoteTableQueryParams } from '../../../../enhanced-zorro-table/src/lib/enhanced-zorro-table.model';

export interface IHero {
  name: string;
  age: number;
  gender: string;
  race: string;
  wowClass: string;
  joinedAt: Date;
}

const allHeroes: IHero[] = [
  {
    name: 'Thrall',
    age: 34,
    race: 'orc',
    wowClass: 'Shaman',
    gender: 'm',
    joinedAt: new Date('2021-01-01 08:23:45'),
  },
  {
    name: 'Anduin Wrynn',
    age: 24,
    race: 'human',
    wowClass: 'Priest',
    gender: 'm',
    joinedAt: new Date('2021-01-01 09:23:45'),
  },
  {
    name: 'Arthas Menethil',
    age: 45,
    race: 'human',
    wowClass: 'Death knight',
    gender: 'm',
    joinedAt: new Date('2021-01-02 08:23:45'),
  },
  {
    name: 'Sylvanas Windrunner',
    age: 34,
    race: 'undead',
    wowClass: 'Ranger',
    gender: 'f',
    joinedAt: new Date('2020-12-15 12:33:00'),
  },
  {
    name: 'VolJin',
    age: 33,
    race: 'troll',
    wowClass: 'Shadow Hunter',
    gender: 'm',
    joinedAt: new Date('2021-02-15 12:23:00'),
  },
  {
    name: 'Chen Stormstout',
    age: 52,
    race: 'panda men',
    wowClass: 'Monk',
    gender: 'm',
    joinedAt: new Date('2021-01-13 08:34:56'),
  },
  {
    name: 'Varian Wrynn',
    age: 52,
    race: 'human',
    wowClass: 'Worrier',
    gender: 'm',
    joinedAt: new Date('2021-01-12 08:34:56'),
  },
  {
    name: 'Rexxar',
    age: 42,
    race: 'orc',
    wowClass: 'Hunter',
    gender: 'm',
    joinedAt: new Date('2021-01-11 08:34:56'),
  },
  {
    name: 'Jaina Proudmoore',
    age: 32,
    race: 'human',
    wowClass: 'Mage',
    gender: 'f',
    joinedAt: new Date('2021-01-10 08:34:56'),
  },
  {
    name: 'Garrosh Hellscream',
    age: 45,
    race: 'orc',
    wowClass: 'Worrier',
    gender: 'm',
    joinedAt: new Date('2021-01-19 08:34:56'),
  },
  {
    name: 'Cairne Bloodhoof',
    age: 65,
    race: 'tauren',
    wowClass: 'Worrier',
    gender: 'm',
    joinedAt: new Date('2021-01-18 08:34:56'),
  },
  {
    name: 'Grommash Hellscream',
    age: 65,
    race: 'orc',
    wowClass: 'Worrier',
    gender: 'm',
    joinedAt: new Date('2021-01-01 08:34:56'),
  },
  {
    name: 'Turalyon',
    age: 62,
    race: 'human',
    wowClass: 'Paladin',
    gender: 'm',
    joinedAt: new Date('2020-12-31 08:34:56'),
  },
  {
    name: 'Alleria Windrunner',
    age: 62,
    race: 'elf',
    wowClass: 'Hunter',
    gender: 'f',
    joinedAt: new Date('2020-12-31 08:34:56'),
  },
];

@Injectable({ providedIn: 'root' })
export class DataMockerService {
  getPaginatedHeroes({
    pageIndex,
    pageSize,
    filter,
  }: IRemoteTableQueryParams): Observable<{
    data: IHero[];
    total: number;
  }> {
    const hitData = allHeroes.reduce<IHero[]>((prev, item) => {
      let isFiltered = true;
      (filter || []).forEach((f) => {
        if (
          f.value !== null &&
          f.value !== undefined &&
          item[f.key] !== f.value
        ) {
          isFiltered = false;
        }
      });
      if (isFiltered) {
        return [...prev, item];
      }
      return prev;
    }, []);
    const start = (pageIndex - 1) * pageSize;
    const end = pageIndex * pageSize;
    return of({
      data: hitData.slice(start, end),
      total: hitData.length,
    }).pipe(delay(1000));
  }
}
